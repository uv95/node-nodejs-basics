import { unlink, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {
  const folderName = 'files';
  const fileName = 'fileToRemove.txt';
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const filePath = join(__dirname, folderName, fileName);

  try {
    const isFileExists = await pathExists(filePath);

    if (!isFileExists) {
      throw new Error('FS operation failed');
    }

    await unlink(filePath);
  } catch (error) {
    console.log(error);
  }
};

await remove();

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch (error) {
    return false;
  }
}
