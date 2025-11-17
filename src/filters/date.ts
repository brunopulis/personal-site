import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

/**
 * Formata uma data para o formato DD/MM/AAAA.
 *
 * @param date - A data a ser formatada (Date, string ou number).
 * @returns A string da data formatada.
 */
export function formatDate(date: Date | string | number): string {
  return dayjs(date).format('DD/MM/YYYY');
}

/**
 * Formata uma data para o formato "1 de Janeiro de 2025".
 *
 * @param date - A data a ser formatada.
 * @returns A string da data formatada.
 */
export function formatVerboseDate(date: Date | string | number): string {
  return dayjs(date).format('D [de] MMMM [de] YYYY');
}

/**
 * Formata uma data para o formato timestamp
 *
 * @param date - A data a ser formatada (Date, string ou number).
 * @returns A string no formato ISO 8601 (UTC).
 */
export function formatTimestamp(date: Date | string | number): string {
  return dayjs(date).toISOString();
}
