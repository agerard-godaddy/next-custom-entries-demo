import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

function stripHash(fileName) {
  const idx = fileName.lastIndexOf('-');
  return fileName.slice(0, idx);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathParts = ['static', 'chunks', 'entries'];
let __partialFiles;

export function getEntryChunks(assetPrefix = '') {
  if (!__partialFiles) {
    __partialFiles = fs.readdirSync(path.join(__dirname, '..', '.next', ...pathParts))
      .reduce((acc,cur) => {
        return {
          ...acc,
          [stripHash(cur)]: [...pathParts, cur].join('/')
        }
      }, {});
  }
  return __partialFiles;
}
