export const toRfc822Date = dateObj => {
  try {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('EEE, dd LLL yyyy HH:mm:ss Z');
  } catch {
    return '';
  }
};
