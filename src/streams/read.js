import { createReadStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const read = async () => {
  const folderName = 'files';
  const fileName = 'fileToRead.txt';
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const filePath = join(__dirname, folderName, fileName);

  try {
    const stream = createReadStream(filePath);
    await pipeline(stream, process.stdout);
  } catch (error) {
    console.log(error);
  }
};

await read();
