import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const rootDir = process.cwd();
const prismaSchemaPath = path.join(rootDir, "prisma", "schema.prisma");

if (!existsSync(prismaSchemaPath)) {
  console.log("[build] No Prisma schema detected at prisma/schema.prisma. Skipping Prisma generation.");
  process.exit(0);
}

const bin = process.platform === "win32" ? "npx.cmd" : "npx";
const result = spawnSync(
  bin,
  ["prisma", "generate", "--schema", prismaSchemaPath],
  { stdio: "inherit" },
);

if (result.error) {
  console.error("[build] Failed to execute Prisma generation command:", result.error.message);
  process.exit(1);
}

if (result.status !== 0) {
  process.exit(result.status);
}

console.log("[build] Prisma generation completed successfully.");
