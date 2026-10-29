import { NextResponse } from "next/server";
import OpenAI from "openai";

import { chatKnowledgeBase } from "@/lib/chat-knowledge";
import { forbidden, getClientIp, isRateLimited, isSameOrigin, readJson, str, tooManyRequests } from "@/lib/security";

const MAX_MESSAGE_LENGTH = 400;
const MAX_BODY_BYTES = 2_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
// Daily cap per client so a patient attacker can't run up the OpenAI bill one minute at a time.
const DAILY_WINDOW_MS = 24 * 60 * 60_000;
const DAILY_MAX_REQUESTS = 60;

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return forbidden();

  const ip = getClientIp(request);

  if (
    isRateLimited(`chat:${ip}`, RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS) ||
    isRateLimited(`chat-daily:${ip}`, DAILY_MAX_REQUESTS, DAILY_WINDOW_MS)
  ) {
    return tooManyRequests("Too many questions at once — try again in a minute.");
  }

  const data = (await readJson(request, MAX_BODY_BYTES)) as Record<string, unknown> | null;
  const message = str(data?.message);

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
