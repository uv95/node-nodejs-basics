import { readFile, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  const folderName = 'files';
  const fileName = 'fileToRead.txt';
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const filePath = join(__dirname, folderName, fileName);

  try {
    const isFileExists = await pathExists(filePath);

    if (!isFileExists) {
      throw new Error('FS operation failed');
    }

    const content = await readFile(filePath, 'utf-8');
    console.log(content);
  } catch (error) {
    console.log(error);
  }
};

await read();

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch (error) {
    return false;
  }
}
