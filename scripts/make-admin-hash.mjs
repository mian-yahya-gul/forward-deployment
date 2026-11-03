#!/usr/bin/env node
// Run locally: node scripts/make-admin-hash.mjs
// Prompts for the dashboard password (not echoed) and prints the two values to paste into Vercel
// (Project > Settings > Environment Variables): ADMIN_PASSWORD_HASH and ADMIN_SESSION_SECRET.
// Nothing is stored or sent anywhere by this script.
import { randomBytes, scryptSync } from "node:crypto";
import readline from "node:readline";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
rl._writeToOutput = (s) => { if (s.includes("Password") || s.includes("Repeat") || s === "\r\n" || s === "\n") process.stdout.write(s); };
const ask = (q) => new Promise((res) => rl.question(q, res));
const p1 = await ask("Password (min 14 characters): ");
const p2 = await ask("Repeat password: ");
rl.close();
if (p1 !== p2 || p1.length < 14) { console.error("\nPasswords differ or are shorter than 14 characters. Nothing printed."); process.exit(1); }
const salt = randomBytes(16).toString("hex");
const hash = scryptSync(p1, Buffer.from(salt, "hex"), 32, { N: 16384 }).toString("hex");
console.log("\nADMIN_PASSWORD_HASH=scrypt$16384$" + salt + "$" + hash);
console.log("ADMIN_SESSION_SECRET=" + randomBytes(32).toString("hex"));
