import {createInterface} from 'readline';

export function createPrompter(input, output = process.stdout) {
  const rl = createInterface({input});
  const queue = [];
  let pendingResolve = null;
  let closed = false;

  rl.on('line', line => {
    if (pendingResolve) {
      const resolve = pendingResolve;
      pendingResolve = null;
      resolve(line);
    } else {
      queue.push(line);
    }
  });

  rl.on('close', () => {
    closed = true;
    if (pendingResolve) {
      const resolve = pendingResolve;
      pendingResolve = null;
      resolve('');
    }
  });

  return {
    ask(question) {
      output.write(question);
      if (queue.length > 0) {
        return Promise.resolve(queue.shift());
      }
      if (closed) {
        return Promise.resolve('');
      }
      return new Promise(resolve => {
        pendingResolve = resolve;
      });
    },
    close() {
      rl.close();
    }
  };
}
