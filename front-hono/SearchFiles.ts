import fs from "fs";
import path from "path";

export function loadAssets(): { [key: string]: string } {
  const dir = path.resolve("dist/assets");
  const files = fs.readdirSync(dir);

  const result: { [key: string]: string } = {};

  files.forEach((f) => {
    if (!f.endsWith(".js")) return;
    const base = f.replace(/-.*\.js$/, ".js");
    const key = base.replace(/\.js$/, "JS");
    result[key] = f;
  });
  return result;
}
