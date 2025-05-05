import { createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const write = async () => {
  const folderName = 'files';
  const fileName = 'fileToWrite.txt';
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const filePath = join(__dirname, folderName, fileName);

  try {
    const stream = createWriteStream(filePath);
    await pipeline(process.stdin, stream);
  } catch (error) {
    console.log(error);
  }
};

await write();
