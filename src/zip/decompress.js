import { createReadStream, createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';
import { createGunzip } from 'zlib';

const decompress = async () => {
  const folderName = 'files';
  const srcFileName = 'archive.gz';
  const targetFileName = 'fileToCompress.txt';

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const srcFilePath = join(__dirname, folderName, srcFileName);
  const targetFilePath = join(__dirname, folderName, targetFileName);

  try {
    const readStream = createReadStream(srcFilePath);
    const gunzibStream = createGunzip();
    const writeStream = createWriteStream(targetFilePath);

    await pipeline(readStream, gunzibStream, writeStream);
  } catch (error) {
    console.log(error);
  }
};

await decompress();
