import { cp, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
  const srcFolderName = 'files';
  const destFolderName = 'files_copy';
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const srcFolderPath = join(__dirname, srcFolderName);
  const destFolderPath = join(__dirname, destFolderName);

  try {
    const isSrcFolderExists = await pathExists(srcFolderPath);
    const isDestFolderExists = await pathExists(destFolderPath);

    if (!isSrcFolderExists || isDestFolderExists) {
      throw new Error('FS operation failed');
    }

    await cp(srcFolderPath, destFolderPath, {
      errorOnExist: true,
      recursive: true,
    });
  } catch (error) {
    console.log(error);
  }
};

await copy();

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch (error) {
    return false;
  }
}
