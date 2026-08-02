export const htmlDateString = dateObj => {
  try {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  } catch {
    return '';
  }
};
