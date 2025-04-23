import { writeFile, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
  const folderName = 'files';
  const fileName = 'fresh.txt';
  const content = 'I am fresh and young';

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = join(__dirname, folderName, fileName);

  const fileExists = await pathExists(filePath);

  if (fileExists) {
    throw new Error('FS operation failed');
  }

  try {
    await writeFile(filePath, content);
  } catch (error) {
    console.log('Error: ', error.message);
  }
};

await create();

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch (error) {
    return false;
  }
}
