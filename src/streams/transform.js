import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

const transform = async () => {
  try {
    const transform = new Transform({
      transform(chunk, encoding, callback) {
        const reversedText =
          chunk.toString().split('').reverse().join('') + '\n';
        callback(null, reversedText);
      },
    });
    await pipeline(process.stdin, transform, process.stdout);
  } catch (error) {
    console.log(error);
  }
};

await transform();
