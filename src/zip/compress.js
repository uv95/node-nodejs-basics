import { createReadStream, createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';
import { createGzip } from 'zlib';

const compress = async () => {
  const folderName = 'files';
  const srcFileName = 'fileToCompress.txt';
  const targetFileName = 'archive.gz';

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const srcFilePath = join(__dirname, folderName, srcFileName);
  const targetFilePath = join(__dirname, folderName, targetFileName);

  try {
    const readStream = createReadStream(srcFilePath);
    const gzibStream = createGzip();
    const writeStream = createWriteStream(targetFilePath);

    await pipeline(readStream, gzibStream, writeStream);
  } catch (error) {
    console.log(error);
  }
};

await compress();
