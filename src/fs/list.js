import { readdir, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
  const folderName = 'files';
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const folderPath = join(__dirname, folderName);

  try {
    const isFolderExists = await pathExists(folderPath);

    if (!isFolderExists) {
      throw new Error('FS operation failed');
    }

    const files = await readdir(folderPath);
    console.log(files);
  } catch (error) {
    console.log(error);
  }
};

await list();

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch (error) {
    return false;
  }
}
