import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const calculateHash = async () => {
  const folderName = 'files';
  const fileName = 'fileToCalculateHashFor.txt';
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const filePath = join(__dirname, folderName, fileName);

  try {
    const hash = createHash('sha256');
    const stream = createReadStream(filePath);

    await pipeline(stream, hash);

    console.log(hash.digest('hex'));
  } catch (error) {
    console.log(error);
  }
};

await calculateHash();
