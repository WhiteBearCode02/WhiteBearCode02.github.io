import { copyFile, readdir } from "node:fs/promises";
import { resolve, sep } from "node:path";

// Windows can emit nested RSC segment paths while the client requests dotted names.
// Keep the original files and add portable aliases; Linux's already-flat files are unchanged.
const root = resolve("out");
let copied = 0;
for (const file of await readdir(root, { recursive: true })) {
  if (!file.endsWith(".txt")) continue;
  const parts = file.split(/[\\/]/);
  const start = parts.findIndex((part) => part.startsWith("__next."));
  if (start < 0 || start === parts.length - 1) continue;
  const alias = [...parts.slice(0, start), parts.slice(start).join(".")].join(
    sep,
  );
  await copyFile(resolve(root, file), resolve(root, alias));
  copied++;
}
console.log(`Prepared ${copied} portable static RSC aliases.`);
