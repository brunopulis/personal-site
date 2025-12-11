export const groupBy = (array, key) => {
  if (!array || !Array.isArray(array)) {
    return {};
  }
  
  return array.reduce((result, item) => {
    const group = item.data ? item.data[key] : item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

export const groupByMonth = (array) => {
  if (!array || !Array.isArray(array)) {
    return [];
  }

  const grouped = {};
  
  array.forEach(item => {
    const date = new Date(item.data?.date || item.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const key = `${year}-${month}`;
    
    if (!grouped[key]) {
      grouped[key] = {
        key,
        label: new Intl.DateTimeFormat('pt-BR', { 
          year: 'numeric', 
          month: 'long' 
        }).format(date),
        items: []
      };
    }
    
    grouped[key].items.push(item);
  });
  
  // Ordena por data decrescente (mais recente primeiro)
  return Object.values(grouped).sort((a, b) => {
    return new Date(b.key) - new Date(a.key);
  });
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

export default groupBy;