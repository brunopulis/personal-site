export const splitlines = (input, maxCharLength) => {
  const parts = input.split(' ');
  const lines = parts.reduce((acc, cur) => {
    if (!acc.length) {
      return [cur];
    }

    const lastOne = acc[acc.length - 1];

    if (lastOne.length + cur.length >= maxCharLength) {
      acc.push(cur);
      return acc;
    }

    acc[acc.length - 1] = `${lastOne} ${cur}`;

    return acc;
  }, []);

  return lines;
};
