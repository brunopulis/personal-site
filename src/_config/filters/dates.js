import dayjs from 'dayjs';
import locale_pt_br from 'dayjs/locale/pt-br.js';
import locale_en from 'dayjs/locale/en.js';

/** Converts the given date string to ISO8610 format. */
export const toISOString = dateString => dayjs(dateString).toISOString();

/** Formats a date using dayjs's conventions: https://day.js.org/docs/en/display/format */
export const formatDate = (date, format) => dayjs(date).locale(locale_pt_br).format(format);
export const formatDatePT_BR = (date, format) => dayjs(date).locale(locale_pt_br).format(format);
export const formatDateEN = (date, format) => dayjs(date).locale(locale_en).format(format);

/** Retorna a data no formato legível em português brasileiro (ex: 15 de dezembro de 2024) */
export const readableDate = date => dayjs(date).locale(locale_pt_br).format('D [de] MMMM [de] YYYY');

/** Retorna apenas o ano */
export const year = date => dayjs(date).format('YYYY');