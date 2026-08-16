import { NextResponse } from "next/server";
import OpenAI from "openai";

import { chatKnowledgeBase } from "@/lib/chat-knowledge";

const MAX_MESSAGE_LENGTH = 400;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;

/**
 * Soft, per-instance rate limit — resets on cold start and isn't shared
 * across serverless instances, but stops a single client from hammering the
 * endpoint. Good enough for a marketing-site chatbot; swap for a durable
 * store (e.g. Upstash) if traffic warrants it.
 */
const requestLog = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = requestLog.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    requestLog.set(ip, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

interface ChatPayload {
  message?: string;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many questions at once — try again in a minute." },
      { status: 429 },
    );
  }

  const data = (await request.json().catch(() => null)) as ChatPayload | null;
  const message = data?.message?.trim() ?? "";

  if (!message) {
    return NextResponse.json({ error: "Ask a question first." }, { status: 400 });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Keep it under ${MAX_MESSAGE_LENGTH} characters.` },
      { status: 400 },
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not configured.");
    return NextResponse.json(
      { error: "The assistant isn't configured yet. Try /contact instead." },
      { status: 500 },
    );
  }

  const openai = new OpenAI();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      max_tokens: 400,
      messages: [
        { role: "system", content: chatKnowledgeBase },
        { role: "user", content: message },
      ],
    });

    const choice = response.choices[0];

    if (choice?.finish_reason === "content_filter") {
      return NextResponse.json({
        answer: "I can't help with that one — try asking about our services, industries, or how to get in touch.",
      });
    }

    const answer = choice?.message?.content?.trim();

    if (!answer) {
      return NextResponse.json(
        { error: "Didn't get a usable answer — try rephrasing." },
        { status: 502 },
      );
    }

    return NextResponse.json({ answer });
  } catch (error) {
    if (error instanceof OpenAI.RateLimitError) {
      return NextResponse.json(
        { error: "The assistant is busy right now — try again shortly." },
        { status: 429 },
      );
    }
    console.error("Chat request failed:", error);
    return NextResponse.json(
      { error: "Something went wrong. Try /contact instead." },
      { status: 500 },
    );
  }
}
