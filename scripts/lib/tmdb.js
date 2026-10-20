const BASE_URL = 'https://api.themoviedb.org/3';

function apiKey() {
  const key = process.env.TMDB_API_KEY;
  if (!key) throw new Error('TMDB_API_KEY não definida no ambiente (.env)');
  return key;
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function searchMovies(query) {
  const url = `${BASE_URL}/search/movie?api_key=${apiKey()}&query=${encodeURIComponent(query)}&language=pt-BR`;
  const data = await fetchJson(url);
  return (data.results || []).map(r => ({
    ...r,
    resultType: 'movie',
    displayTitle: r.title,
    year: (r.release_date || '').split('-')[0] || '?'
  }));
}

export async function searchShows(query) {
  const url = `${BASE_URL}/search/tv?api_key=${apiKey()}&query=${encodeURIComponent(query)}&language=pt-BR`;
  const data = await fetchJson(url);
  return (data.results || []).map(r => ({
    ...r,
    resultType: 'show',
    displayTitle: r.name,
    year: (r.first_air_date || '').split('-')[0] || '?'
  }));
}

export async function searchTitles(query) {
  const [movies, shows] = await Promise.allSettled([searchMovies(query), searchShows(query)]);
  return [
    ...(movies.status === 'fulfilled' ? movies.value : []),
    ...(shows.status === 'fulfilled' ? shows.value : [])
  ];
}

export async function getDetails(id, resultType) {
  const path = resultType === 'movie' ? 'movie' : 'tv';
  const url = `${BASE_URL}/${path}/${id}?api_key=${apiKey()}&language=pt-BR&append_to_response=credits`;
  return fetchJson(url);
}

export function defaultPosterUrl(posterPath) {
  return posterPath ? `https://image.tmdb.org/t/p/w600_and_h900_face${posterPath}` : '';
}
