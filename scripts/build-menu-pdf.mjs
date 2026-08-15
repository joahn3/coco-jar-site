import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT_DIR = process.cwd();
const SOURCE_DIR = path.join(ROOT_DIR, "public", "meniu", "fotografii");
const OUTPUT_PATH = path.join(
  ROOT_DIR,
  "public",
  "meniu",
  "coco-jar-meniu-detaliat-2026-08-15.pdf",
);

function findImageMagickBinary() {
  const candidates = ["magick", "convert"];
  for (const binary of candidates) {
    try {
      execSync(`command -v ${binary}`, { stdio: "ignore" });
      return binary;
    } catch {
      // ignore
    }
  }
  throw new Error(
    "Nu există ImageMagick în PATH. Instalează-l pentru a genera PDF-ul din imagini.",
  );
}

async function main() {
  const files = (await readdir(SOURCE_DIR))
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));

  if (!files.length) {
    throw new Error(`Nu există imagini în ${SOURCE_DIR}.`);
  }

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });

  const binary = findImageMagickBinary();
  const quoted = files
    .map((file) => `'${path.join(SOURCE_DIR, file).replace(/'/g, "'\"'\"'")}'`)
    .join(" ");
  execSync(`${binary} ${quoted} -quality 92 -density 144 '${OUTPUT_PATH.replace(/'/g, "'\"'\"'")}'`, {
    stdio: "inherit",
  });
  console.log(`PDF generat: ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
