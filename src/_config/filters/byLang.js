/**
 * 
 */
export const byLang = (collection, targetLang) => {
  // Segurança: garante que estamos lidando com um array.
  if (!Array.isArray(collection)) return [];

  // Cada item da collection tem a forma { data: { … } }
  return collection.filter(item => {
    // Se o front‑matter não possuir `lang`, ignoramos o item.
    const itemLang = item?.data?.lang;
    return itemLang && itemLang === targetLang;
  });
}