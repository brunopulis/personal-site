export const readableDate = dateObj => {
  try {
    if (typeof dateObj === 'string') {
      return DateTime.fromISO(dateObj, {zone: 'utc'}).toFormat('LLLL d, yyyy');
    }
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('LLLL d, yyyy');
  } catch {
    return '';
  }
};
