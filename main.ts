// One Line, One Laugh — entry program.
// Writes one funny line (1-140 chars) to /output/entry.txt.
// The joke: the phone's screen time report has filed for custody of the
// user's attention — a legal framing for a digital habit.
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const LIMIT = 140;

function joke(): string {
  const report = "My phone's screen time report just filed for custody of my attention.";
  return report;
}

function validate(line: string): void {
  const n = [...line].length;
  if (n < 1 || n > LIMIT) {
    throw new Error(`joke fails the 1-${LIMIT} character gate (${n})`);
  }
  if (line.includes("\n")) {
    throw new Error("joke must be a single line");
  }
  // The joke must be about screen time, framed as a custody filing.
  if (!/screen time report just filed for custody/.test(line)) {
    throw new Error("joke must carry the custody filing");
  }
  // The punch is the thing being fought over: my attention.
  if (!/custody of my attention\.$/.test(line)) {
    throw new Error("joke must end on the custody of my attention");
  }
  // One sentence, one joke: the whole line is a single filing.
  const sentences = line.split(/(?<=\.)\s+/);
  if (sentences.length !== 1) {
    throw new Error("joke must be a single sentence");
  }
}

const line = joke();
validate(line);
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
mkdirSync(outDir, { recursive: true });
const target = resolve(outDir, "entry.txt");
writeFileSync(target, Buffer.from(line, "utf8"));
console.log(`wrote ${[...line].length} chars to ${target}`);
