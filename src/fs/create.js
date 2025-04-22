import { writeFile, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const create = async () => {
  const folderName = 'files';
  const fileName = 'fresh.txt';
  const content = 'I am fresh and young';
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = join(__dirname, folderName, fileName);

  try {
    await access(filePath);
    throw new Error('FS operation failed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeFile(filePath, content);
    } else {
      console.log('Error: ', error.message);
    }
  }
};

await create();
