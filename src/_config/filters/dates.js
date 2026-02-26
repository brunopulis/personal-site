import dayjs from 'dayjs';
import locale_pt_br from 'dayjs/locale/pt-br.js';

dayjs.locale(locale_pt_br); 

export const toISOString = dateString => dayjs(dateString).toISOString();

export const toRfc822Date = (date) => {
  return new Date(date).toUTCString();
};

export const toRfc3339Date = (date) => {
  return new Date(date).toRfc3339Date();
}

export const formatDate = (date, format) => dayjs(date).format(format);

/** Retorna a data no formato legível em português brasileiro (ex: 15 de dezembro de 2024) */
export const readableDate = date => dayjs(date, { zone: "America/Sao_Paulo" }).format('D [de] MMMM [de] YYYY');

/** * Retorna a data em formato relativo (ex: "há 3 dias").
 * @param {Date} date - Objeto Date ou string de data.
 * @returns {string} 
 */
export const relativeDate = date => {
    const now = new Date();
    const diff = now - new Date(date);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'hoje';
    if (days === 1) return 'ontem';
    if (days < 7) return `${days} dias atrás`;
    if (days < 30) return `${Math.floor(days / 7)} semanas atrás`;
    return dayjs(date).format('dd/MM/yyyy');
};

export const sortByDate = (array) => {
  if (!array || !Array.isArray(array)) {
    return [];
  }

  return array.sort((a, b) => {
    const dateA = new Date(a.data?.date || a.date);
    const dateB = new Date(b.data?.date || b.date);
    return dateB - dateA;
  });
};

export const year = date => dayjs(date).format('YYYY');
