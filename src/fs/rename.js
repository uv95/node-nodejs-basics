import fs from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
  const folderName = 'files';
  const srcFileName = 'wrongFilename.txt';
  const destFileName = 'properFilename.md';
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const srcFilePath = join(__dirname, folderName, srcFileName);
  const destFilePath = join(__dirname, folderName, destFileName);

  try {
    const isSrcFileExists = await pathExists(srcFilePath);
    const isDestFileExists = await pathExists(destFilePath);

    if (!isSrcFileExists || isDestFileExists) {
      throw new Error('FS operation failed');
    }

    await fs.rename(srcFilePath, destFilePath);
  } catch (error) {
    console.log(error);
  }
};

await rename();

async function pathExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch (error) {
    return false;
  }
}
