const parseArgs = () => {
  const args = process.argv.slice(2);
  const result = args.reduce((acc, curr, index) => {
    acc += curr;

    if (curr.startsWith('--')) {
      acc += ` is `;
      return acc;
    }

    return index === args.length - 1 ? acc : `${acc}, `;
  }, '');

  console.log(result);
};

parseArgs();
