import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line review of my own Monday. The inbox number and the 9 a.m.
// meeting about meetings are the concrete Monday; the coffee quitting
// before I do is the turn, and the one-star verdict is the line a
// coworker repeats the next morning.
const ENTRY =
  "My Monday opened with 47 unread emails, a 9 a.m. meeting about meetings, and a coffee that filed for resignation before I did — one star, would not Monday again.";

const MAX_CHARS = 200;
const EXPECTED_CHARS = 161;
const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

function main(): void {
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} characters, must be 1 to ${MAX_CHARS}`);
  }
  if (chars !== EXPECTED_CHARS) {
    throw new Error(`entry is ${chars} characters, expected ${EXPECTED_CHARS}`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (ENTRY.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  // Create /output if needed; never delete the output directory itself.
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, ENTRY, "utf8");
  const written = readFileSync(OUT_FILE, "utf8");
  if (written !== ENTRY) {
    throw new Error("entry.txt does not match the entry line");
  }
  if (!Buffer.from(written, "utf8").equals(Buffer.from(ENTRY, "utf8"))) {
    throw new Error("entry.txt bytes do not match the entry line");
  }
  console.log(`${chars} chars, 1 line:`);
  console.log(written);
}

main();
