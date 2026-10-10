import { access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const exportRoot = fileURLToPath(new URL('../out/', import.meta.url));
const requiredFiles = [
  'index.html',
  'projects/index.html',
  'projects/airptcoach/index.html',
  'projects/al2beat/index.html',
  'projects/sumo-research/index.html',
  'about/index.html',
  'experience/index.html',
  'contact/index.html',
  '404.html',
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
    throw new Error(`Missing exported pages:\n${missing.join('\n')}`);
  }
  console.log(`Verified ${requiredFiles.length} exported HTML files.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  verifyStaticExport().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
