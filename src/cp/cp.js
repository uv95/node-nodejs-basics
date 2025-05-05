import { fork } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const spawnChildProcess = async (args) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const scriptPath = join(__dirname, 'files', 'script.js');

  const childProcess = fork(scriptPath, args, {
    silent: true,
  });

  try {
    await Promise.all([
      pipeline(process.stdin, childProcess.stdin),
      pipeline(childProcess.stdout, process.stdout),
    ]);
  } catch (error) {
    console.log(error);
  }
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['hello', 'world']);
