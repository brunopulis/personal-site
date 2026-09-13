import dayjs from 'dayjs';
import {DateTime} from 'luxon';

/** Formats a date using dayjs's conventions: https://day.js.org/docs/en/display/format */
export const formatDate = (date, format) => dayjs(date).format(format);

export const toRfc822Date = dateObj => {
  try {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('EEE, dd LLL yyyy HH:mm:ss Z');
  } catch {
    return '';
  }
};
