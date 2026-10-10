import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Called only by Server Components at build time; never shipped to the browser.
export function getResumePath(): string | undefined {
  try {
    const path = "/resume/resume.pdf";
    const file = readFileSync(resolve(process.cwd(), `public${path}`));
    return file.subarray(0, 5).toString() === "%PDF-" ? path : undefined;
  } catch {
    return undefined;
  }
}
