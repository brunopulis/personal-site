const MONTHS_SHORT_PT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const MONTHS_LONG_PT = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];

const parseDate = dateObj => {
  const date = typeof dateObj === 'string' ? new Date(dateObj) : new Date(dateObj);
  if (Number.isNaN(date.getTime())) throw new Error('invalid date');
  return {
    day: String(date.getUTCDate()).padStart(2, '0'),
    dayShort: String(date.getUTCDate()),
    month: date.getUTCMonth(),
    year: String(date.getUTCFullYear())
  };
};

export const readableDate = (dateObj, format = 'DD de MMM, YYYY') => {
  try {
    const {day, dayShort, month, year} = parseDate(dateObj);
    const tokens = {
      DD: day,
      D: dayShort,
      MMM: MONTHS_SHORT_PT[month],
      MMMM: MONTHS_LONG_PT[month],
      YYYY: year
    };
    return format.replace(/MMMM|MMM|DD|YYYY|D/g, match => tokens[match]);
  } catch {
    return '';
  }
};
