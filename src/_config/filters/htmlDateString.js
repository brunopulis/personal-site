export const htmlDateString = dateObj => {
  try {
    const date = new Date(dateObj);
    if (Number.isNaN(date.getTime())) throw new Error('invalid date');
    const pad = n => String(n).padStart(2, '0');
    return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
  } catch {
    return '';
  }
};
