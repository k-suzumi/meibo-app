import fs from 'fs';
import path from 'path';

export function loadAssets(): { [key: string]: string } {
  const dir = path.resolve('dist/assets');
  const files = fs.readdirSync(dir);

  const result: { [key: string]: string } = {};

  files.forEach(f => {
    const match = f.match(/^([^.]+)-.*\.js$/);
    if (match) {
      const key = match[1] + "JS";
      result[key] = f;
    }
  });

  return result;
}
