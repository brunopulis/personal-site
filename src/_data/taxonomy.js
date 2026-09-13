const genre = (...labels) => labels.map(label => ({label}));

export const categories = {
  posts: genre('Acessibilidade', 'Teologia', 'Pessoal', 'Dev', 'QA', 'Produtividade', 'Eventos', 'Carreira'),

  books: genre(
    'Cristianismo',
    'Fantasia',
    'Produtividade',
    'Quadrinhos',
    'Finanças',
    'Diversos',
    'Tecnologia',
    'Saúde',
    'Ficção'
  ),

  movies: genre(
    'Ação',
    'Animação',
    'Comédia',
    'Crime',
    'Documentário',
    'Drama',
    'Fantasia',
    'Ficção',
    'Guerra',
    'História',
    'HQ',
    'Sci-Fi'
  ),

  shows: genre(
    'Ação',
    'Animação',
    'Comédia',
    'Crime',
    'Documentário',
    'Drama',
    'Fantasia',
    'Ficção',
    'Guerra',
    'História',
    'HQ',
    'Sci-Fi'
  )
};

export default {categories};
