import { Worker } from 'worker_threads';
import os from 'os';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const performCalculations = async () => {
  const MIN_NUMBER = 10;

  const workerFile = 'worker.js';
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const workerPath = join(__dirname, workerFile);

  const coresNum = os.cpus().length;
  const numbers = Array.from(
    { length: coresNum },
    (_, index) => index + MIN_NUMBER
  );

  const promises = numbers.map(async (number) => {
    try {
      const data = await createWorker(number, workerPath);
      return {
        status: 'resolved',
        data,
      };
    } catch (error) {
      return {
        status: 'error',
        data: null,
      };
    }
  });

  const result = await Promise.all(promises);
  console.log(result);
};

await performCalculations();

function createWorker(number, path) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path, {
      workerData: { number },
    });

    worker.on('message', (data) => resolve(data));
    worker.on('error', (_) => reject());
  });
}
