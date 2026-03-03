// Mapeamento de ícones
export const streamIcon = (type) => {
  const icons = {
    book: '📚',
    music: '🎵',
    film: '🎬',
    podcast: '🎧',
    concert: '🎤',
    link: '🔗',
    note: '💭',
    post: '✍️',
  };
  return icons[type] || icons.note;
};

// Label do tipo
export const streamTypeLabel = (type) => {
  const labels = {
    book: 'Livro',
    music: 'Música',
    film: 'Filme',
    podcast: 'Podcast',
    concert: 'Show',
    link: 'Link',
    note: 'Nota',
  };
  return labels[type] || type;
};
