import { readFile, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const projectRoot = new URL("../", import.meta.url);
const entries = [
  { id: "airptcoach-home", folder: "airptcoach", name: "home" },
  { id: "al2beat-learning", folder: "al2beat", name: "learning" },
  { id: "sumo-poster", folder: "sumo-research", name: "poster" },
];
const extensions = ["png", "jpg", "jpeg", "webp"];

function dimensions(buffer) {
  if (
    buffer.length >= 24 &&
    buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  ) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  if (buffer.length >= 2 && buffer.readUInt16BE(0) === 0xffd8) {
    let offset = 2;
    while (offset + 4 <= buffer.length) {
      if (buffer[offset] !== 0xff) break;
      const marker = buffer[offset + 1];
      if (marker === 0xda || marker === 0xd9) break;
      if (marker === 0xff) {
        offset++;
        continue;
      }
      const length = buffer.readUInt16BE(offset + 2);
      if (length < 2 || offset + 2 + length > buffer.length) break;
      if (
        [
          0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd,
          0xce, 0xcf,
        ].includes(marker) &&
        length >= 7
      ) {
        return {
          width: buffer.readUInt16BE(offset + 7),
          height: buffer.readUInt16BE(offset + 5),
        };
      }
      offset += 2 + length;
    }
  }
  if (
    buffer.length >= 30 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    const chunk = buffer.toString("ascii", 12, 16);
    if (chunk === "VP8X")
      return {
        width: buffer.readUIntLE(24, 3) + 1,
        height: buffer.readUIntLE(27, 3) + 1,
      };
    if (
      chunk === "VP8 " &&
      buffer.subarray(23, 26).equals(Buffer.from([157, 1, 42]))
    ) {
      return {
        width: buffer.readUInt16LE(26) & 0x3fff,
        height: buffer.readUInt16LE(28) & 0x3fff,
      };
    }
    if (chunk === "VP8L" && buffer[20] === 0x2f) {
      return {
        width: 1 + (buffer[21] | ((buffer[22] & 0x3f) << 8)),
        height:
          1 +
          ((buffer[22] >> 6) | (buffer[23] << 2) | ((buffer[24] & 0x0f) << 10)),
      };
    }
  }
  throw new Error(
    "지원하는 PNG, JPEG 또는 WebP 이미지 형식을 확인할 수 없습니다.",
  );
}

const images = {};
for (const entry of entries) {
  for (const extension of extensions) {
    const src = `/images/projects/${entry.folder}/${entry.name}.${extension}`;
    const file = new URL(`public${src}`, projectRoot);
    try {
      await access(file);
    } catch (error) {
      if (error.code === "ENOENT") continue;
      throw error;
    }
    const size = dimensions(await readFile(file));
    if (
      !size.width ||
      !size.height ||
      size.width > 30000 ||
      size.height > 30000
    ) {
      throw new Error(`유효하지 않은 이미지 크기: ${src}`);
    }
    images[entry.id] = { src, ...size };
    break;
  }
}
const destination = new URL(
  "src/data/project-images.generated.json",
  projectRoot,
);
const content = JSON.stringify(images, null, 2) + "\n";
if ((await readFile(destination, "utf8").catch(() => "")) !== content)
  await writeFile(destination, content);
console.log(
  `Prepared ${Object.keys(images).length}/3 project images. Missing images keep their placeholders.`,
);
console.log(
  `Image folder: ${fileURLToPath(new URL("public/images/projects/", projectRoot))}`,
);
