import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const movies = await getCollection('movies');

  // Ordenar por data mais recente
  const sortedMovies = movies.sort((a, b) => {
    const dateA = a.data.date || new Date(a.data.attendedYear || 0);
    const dateB = b.data.date || new Date(b.data.attendedYear || 0);
    return dateB.getTime() - dateA.getTime();
  });

  return rss({
    stylesheet: '/rss-styles.xsl',
    title: 'Filmes - Bruno Pulis',
    description:
      'Filmes que assisti, estou planejando assistir e minhas opiniões',
    site: context.site,

    items: sortedMovies.map((movie) => {
      // Emoji baseado no status
      const statusEmoji = {
        assistido: '✅',
        'não assistido': '⏳',
        planejado: '📋',
      };

      const emoji = statusEmoji[movie.data.status] || '🎬';
      const statusLabel = movie.data.status || 'não definido';

      // Construir descrição rica do filme
      const parts = [];

      // Status do filme
      parts.push(
        `<strong>Status:</strong> ${emoji} ${statusLabel.charAt(0).toUpperCase() + statusLabel.slice(1)}`
      );

      // Adicionar avaliação se existir (apenas para filmes assistidos)
      if (
        movie.data.rating !== undefined &&
        movie.data.status === 'assistido'
      ) {
        const fullStars = Math.floor(movie.data.rating);
        const hasHalfStar = movie.data.rating % 1 !== 0;
        const stars = '⭐'.repeat(fullStars) + (hasHalfStar ? '½' : '');
        parts.push(
          `<strong>Avaliação:</strong> ${stars} (${movie.data.rating}/5)`
        );
      }

      // Adicionar categoria/gênero
      if (movie.data.category) {
        parts.push(`<strong>Gênero:</strong> ${movie.data.category}`);
      }

      // Adicionar ano assistido (apenas para assistidos)
      if (movie.data.attendedYear && movie.data.status === 'assistido') {
        parts.push(`<strong>Assistido em:</strong> ${movie.data.attendedYear}`);
      }

      // Adicionar descrição se existir
      if (movie.data.description) {
        parts.push(`<br/>${movie.data.description}`);
      }

      // Adicionar pensamentos/review se existir (apenas para assistidos)
      if (movie.data.thoughts) {
        parts.push(
          `<br/><strong>Minha opinião:</strong><br/>${movie.data.thoughts}`
        );
      }

      // Adicionar recomendação se existir
      if (movie.data.recommendBy) {
        parts.push(
          `<strong>Recomendado por:</strong> ${movie.data.recommendBy}`
        );
      }

      // Adicionar tags se existirem
      if (movie.data.tags && movie.data.tags.length > 0) {
        parts.push(`<strong>Tags:</strong> ${movie.data.tags.join(', ')}`);
      }

      // Adicionar link para mais informações
      if (movie.data.url) {
        parts.push(
          `<a href="${movie.data.url}">🔗 Mais informações sobre o filme</a>`
        );
      }

      const description = parts.join('<br/><br/>');

      // Data de publicação
      const pubDate =
        movie.data.date ||
        (movie.data.attendedYear
          ? new Date(`${movie.data.attendedYear}-01-01`)
          : new Date());

      return {
        title: `${emoji} ${movie.data.title}`,
        pubDate: pubDate,
        description: description,
        link: `/filmes/${movie.slug}/`,
        categories: [
          statusLabel,
          movie.data.category,
          ...(movie.data.tags || []),
        ],
        // Incluir poster se existir
        customData: movie.data.poster
          ? `<enclosure url="${movie.data.poster}" type="image/jpeg" />`
          : undefined,
      };
    }),

    customData: `
      <language>pt-br</language>
      <category>Movies</category>
      <category>Film Reviews</category>
      <category>Cinema</category>
      <category>Watchlist</category>
    `,

    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
      content: 'http://purl.org/rss/1.0/modules/content/',
      dc: 'http://purl.org/dc/elements/1.1/',
    },
  });
}
