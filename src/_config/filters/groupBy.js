/**
 * 
 * @param {s} array 
 * @param {*} key 
 * @returns 
 */
export const groupBy = (array, key) => {
  if (!array || !Array.isArray(array)) {
    return {};
  }
  
  return array.reduce((result, item) => {
    const value = item.data ? item.data[key] : item[key];
    const group = typeof value === 'function' ? value.call(item) : value;
    
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

export const groupByYear = (array) => {
  if (!array || !Array.isArray(array)) {
    return [];
  }

  const grouped = array.reduce((result, item) => {
    const date = new Date(item.data?.pubDate || item.data?.date || item.date);
    const year = date.getFullYear();
    
    if (!result[year]) {
      result[year] = [];
    }
    result[year].push(item);
    return result;
  }, {});

  // Return sorted array of [year, posts] pairs (descending by year)
  return Object.entries(grouped)
    .sort((a, b) => b[0] - a[0])
    .map(([year, items]) => [
      year, 
      items.sort((a, b) => {
        const dateA = new Date(a.data?.pubDate || a.data?.date || a.date);
        const dateB = new Date(b.data?.pubDate || b.data?.date || b.date);
        return dateB - dateA;
      })
    ]);
};

/**
 * 
 * @param {*} array 
 * @returns 
 */
export const groupByMonth = (array) => {
  if (!array || !Array.isArray(array)) {
    return [];
  }

  const grouped = array.reduce((result, item) => {
    const date = new Date(item.data?.pubDate || item.data?.date || item.date);
    const month = date.getMonth();
    
    if (!result[month]) {
      result[month] = [];
    }
    result[month].push(item);
    return result;
  }, {});

  // Return sorted array of [monthIndex, posts] pairs (descending by month index)
  return Object.entries(grouped)
    .sort((a, b) => b[0] - a[0])
    .map(([month, items]) => [
      month,
      items.sort((a, b) => {
        const dateA = new Date(a.data?.pubDate || a.data?.date || a.date);
        const dateB = new Date(b.data?.pubDate || b.data?.date || b.date);
        return dateB - dateA;
      })
    ]);
};

/**
 * 
 * @param {*} array 
 * @returns 
 */
export const groupByYearMonth = (array) => {
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