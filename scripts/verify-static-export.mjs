import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const exportRoot = fileURLToPath(new URL("../out/", import.meta.url));
const requiredFiles = [
  "index.html",
  "projects/index.html",
  "projects/airptcoach/index.html",
  "projects/al2beat/index.html",
  "projects/sumo-research/index.html",
  "about/index.html",
  "experience/index.html",
  "contact/index.html",
  "404.html",
  "sitemap.xml",
  "robots.txt",
  "icon.svg",
  ".nojekyll",
];

export async function verifyStaticExport(root = exportRoot) {
  const missing = [];
  for (const file of requiredFiles) {
    try {
      await access(resolve(root, file));
    } catch {
      missing.push(file);
    }
  }
  if (missing.length) {
    throw new Error(`Missing exported pages:\n${missing.join("\n")}`);
  }
  const assets = new Set();
  for (const file of requiredFiles.filter((file) => file.endsWith(".html"))) {
    const html = await readFile(resolve(root, file), "utf8");
    for (const match of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)) {
      const pathname = new URL(
        match[1].replaceAll("&amp;", "&"),
        "https://portfolio.local",
      ).pathname;
      if (pathname.startsWith("/_next/image"))
        throw new Error(
          "Static export must not depend on the Next.js image server.",
        );
      const local = decodeURIComponent(pathname).replace(/^\//, "");
      const target =
        local === "" || local.endsWith("/") ? `${local}index.html` : local;
      assets.add(target);
    }
  }
  for (const file of assets) {
    try {
      await access(resolve(root, file));
    } catch {
      missing.push(file);
    }
  }
  if (missing.length)
    throw new Error(`Broken local asset or page links:\n${missing.join("\n")}`);
  console.log(
    `Verified ${requiredFiles.length} required export files and ${assets.size} local page/asset references.`,
  );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  verifyStaticExport().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
