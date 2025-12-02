import i18nData from '../../_data/i18n.js';

export function t(key, locale = 'pt-br') {
  // Converter 'pt-br' para 'pt_br' para acessar o objeto
  const langKey = locale.replace('-', '_');
  
  if (!i18nData[langKey]) {
    console.warn(`⚠️ Idioma não encontrado: "${langKey}"`);
    return key;
  }
  
  if (!i18nData[langKey][key]) {
    console.warn(`⚠️ Chave de tradução não encontrada: "${key}" para ${locale}`);
    return key;
  }
  
  return i18nData[langKey][key];
}