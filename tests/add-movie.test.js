import {describe, it, expect} from 'vitest';
import {buildFrontmatter, buildFilePath, computeDefaults} from '../scripts/lib/add-movie.js';

describe('buildFrontmatter', () => {
  it('generate frontmatter for a movie with all fields', () => {
    const result = buildFrontmatter({
      title: 'Duna',
      director: 'Denis Villeneuve',
      category: 'Ficção Científica, Aventura',
      status: 'assistindo',
      rating: '5',
      type: 'movie',
      watchedYear: '2024',
      poster: 'https://image.tmdb.org/t/p/w600_and_h900_face/poster.jpg',
      url: 'https://www.themoviedb.org/movie/123-duna',
      watchedDate: '2024-03-15T10:00:00.000Z',
    });

    expect(result).toContain('title: "Duna"');
    expect(result).toContain('director: Denis Villeneuve');
    expect(result).toContain('category: Ficção Científica, Aventura');
    expect(result).toContain('status: assistindo');
    expect(result).toContain('rating: 5');
    expect(result).toContain('type: movie');
    expect(result).toContain('watchedYear: 2024');
    expect(result).toContain('poster: https://image.tmdb.org/t/p/w600_and_h900_face/poster.jpg');
    expect(result).toContain('url: https://www.themoviedb.org/movie/123-duna');
    expect(result).toContain('watchedDate: 2024-03-15T10:00:00.000Z');
  });

  it('generate frontmatter for a tv show', () => {
    const result = buildFrontmatter({
      title: 'Stranger Things',
      director: 'Ross Duffer, Matt Duffer',
      category: 'Sci-Fi & Fantasy',
      status: 'reassistindo',
      rating: '',
      type: 'tv',
      watchedYear: '2026',
      poster: 'https://image.tmdb.org/t/p/w600_and_h900_face/poster2.jpg',
      url: 'https://www.themoviedb.org/tv/66732-stranger-things',
      watchedDate: '2026-06-15T12:00:00.000Z',
    });

    expect(result).toContain('title: "Stranger Things"');
    expect(result).toContain('status: reassistindo');
    expect(result).toContain('rating:');
    expect(result).toContain('type: tv');
    expect(result).toContain('watchedYear: 2026');
  });

  it('use defaults for optional fields', () => {
    const result = buildFrontmatter({title: 'Test'});

    expect(result).toContain('title: "Test"');
    expect(result).toContain('director:');
    expect(result).toContain('category:');
    expect(result).toContain('status: assistindo');
    expect(result).toContain('rating:');
    expect(result).toContain('type: movie');
    expect(result).toContain('poster:');
    expect(result).toContain('url:');
  });

  it('handle title with special characters', () => {
    const result = buildFrontmatter({
      title: 'O Contador 2: The Sequel',
      watchedDate: '2026-01-01T00:00:00.000Z',
    });

    expect(result).toContain('title: "O Contador 2: The Sequel"');
  });

  it('handle abandonei status', () => {
    const result = buildFrontmatter({
      title: 'Test',
      status: 'abandonei',
      watchedDate: '2026-01-01T00:00:00.000Z',
    });

    expect(result).toContain('status: abandonei');
  });

  it('always generate valid YAML frontmatter delimiters', () => {
    const result = buildFrontmatter({
      title: 'Test',
      watchedDate: '2026-01-01T00:00:00.000Z',
    });

    expect(result.startsWith('---\n')).toBe(true);
    expect(result.includes('\n---\n')).toBe(true);
  });
});

describe('buildFilePath', () => {
  it('generate correct path for a movie', () => {
    const result = buildFilePath({title: 'Duna', type: 'movie', watchedYear: '2024'});
    expect(result.contentDir).toBe('movies');
    expect(result.fileName).toBe('duna.md');
  });

  it('generate correct path for a tv show', () => {
    const result = buildFilePath({title: 'Stranger Things', type: 'tv', watchedYear: '2026'});
    expect(result.contentDir).toBe('shows');
    expect(result.fileName).toBe('2026-stranger-things.md');
  });

  it('slugify accented characters for file names', () => {
    const result = buildFilePath({title: 'Destruição Final 2', type: 'movie', watchedYear: '2026'});
    expect(result.fileName).toBe('destruicao-final-2.md');
  });

  it('handle title with special characters in slug', () => {
    const result = buildFilePath({title: 'O Contador 2: The Sequel', type: 'movie', watchedYear: '2026'});
    expect(result.fileName).toBe('o-contador-2-the-sequel.md');
  });

  it('handle empty title gracefully', () => {
    const result = buildFilePath({title: '', type: 'movie', watchedYear: '2026'});
    expect(result.fileName).toBe('.md');
  });
});

describe('computeDefaults', () => {
  const movieDetails = {
    id: 123,
    title: 'Duna',
    release_date: '2024-03-01',
    poster_path: '/abc123.jpg',
    genres: [{name: 'Ficção Científica'}, {name: 'Aventura'}],
    credits: {
      crew: [{job: 'Director', name: 'Denis Villeneuve'}],
    },
  };

  const showDetails = {
    id: 66732,
    name: 'Stranger Things',
    first_air_date: '2016-07-15',
    poster_path: '/def456.jpg',
    genres: [{name: 'Sci-Fi & Fantasy'}],
    created_by: [{name: 'Ross Duffer'}, {name: 'Matt Duffer'}],
  };

  it('compute defaults for a movie selection', () => {
    const result = computeDefaults(movieDetails, {resultType: 'movie'});
    expect(result.defaultTitle).toBe('Duna');
    expect(result.defaultDirector).toBe('Denis Villeneuve');
    expect(result.defaultCategory).toBe('Ficção Científica, Aventura');
    expect(result.defaultYear).toBe('2024');
    expect(result.defaultPoster).toBe('https://image.tmdb.org/t/p/w600_and_h900_face/abc123.jpg');
    expect(result.defaultUrl).toBe('https://www.themoviedb.org/movie/123-duna');
    expect(result.type).toBe('movie');
  });

  it('compute defaults for a tv show selection', () => {
    const result = computeDefaults(showDetails, {resultType: 'show', displayTitle: 'Stranger Things'});
    expect(result.defaultTitle).toBe('Stranger Things');
    expect(result.defaultDirector).toBe('Ross Duffer, Matt Duffer');
    expect(result.defaultCategory).toBe('Sci-Fi & Fantasy');
    expect(result.defaultYear).toBe('2016');
    expect(result.defaultPoster).toBe('https://image.tmdb.org/t/p/w600_and_h900_face/def456.jpg');
    expect(result.defaultUrl).toBe('https://www.themoviedb.org/tv/66732-stranger-things');
    expect(result.type).toBe('tv');
  });

  it('handle missing credits gracefully', () => {
    const result = computeDefaults({id: 1, title: 'Test', genres: []}, {resultType: 'movie'});
    expect(result.defaultDirector).toBe('');
    expect(result.defaultCategory).toBe('');
  });

  it('handle missing release date for movies', () => {
    const result = computeDefaults({id: 1, title: 'Test', genres: []}, {resultType: 'movie'});
    expect(result.defaultYear).toBe('2026');
  });

  it('handle missing created_by for shows', () => {
    const result = computeDefaults(
      {id: 1, name: 'Test Show', genres: []},
      {resultType: 'show', displayTitle: 'Test Show'},
    );
    expect(result.defaultDirector).toBe('');
  });

  it('handle null poster_path', () => {
    const result = computeDefaults({id: 1, title: 'Test', genres: []}, {resultType: 'movie'});
    expect(result.defaultPoster).toBe('');
  });

  it('fall back to selected displayTitle when details have no title/name', () => {
    const result = computeDefaults({id: 1, genres: []}, {resultType: 'movie', displayTitle: 'Fallback Title'});
    expect(result.defaultTitle).toBe('Fallback Title');
  });
});

describe('buildFrontmatter + buildFilePath integrados', () => {
  it('generate consistent file path and frontmatter for a movie', () => {
    const fields = {
      title: 'Duna',
      director: 'Denis Villeneuve',
      category: 'Ficção Científica, Aventura',
      status: 'assistindo',
      rating: '5',
      type: 'movie',
      watchedYear: '2024',
      poster: 'https://image.tmdb.org/t/p/w600_and_h900_face/abc.jpg',
      url: 'https://www.themoviedb.org/movie/123-duna',
      watchedDate: '2024-03-15T10:00:00.000Z',
    };

    const frontmatter = buildFrontmatter(fields);
    const {contentDir, fileName} = buildFilePath(fields);

    expect(contentDir).toBe('movies');
    expect(fileName).toBe('duna.md');
    expect(frontmatter).toContain('type: movie');
    expect(frontmatter).toContain('watchedYear: 2024');
  });

  it('generate consistent file path and frontmatter for a show', () => {
    const fields = {
      title: 'Stranger Things',
      director: 'Ross Duffer, Matt Duffer',
      category: 'Sci-Fi & Fantasy',
      status: 'assistindo',
      rating: '',
      type: 'tv',
      watchedYear: '2026',
      poster: 'https://image.tmdb.org/t/p/w600_and_h900_face/def.jpg',
      url: 'https://www.themoviedb.org/tv/66732-stranger-things',
      watchedDate: '2026-06-15T12:00:00.000Z',
    };

    const frontmatter = buildFrontmatter(fields);
    const {contentDir, fileName} = buildFilePath(fields);

    expect(contentDir).toBe('shows');
    expect(fileName).toBe('2026-stranger-things.md');
    expect(frontmatter).toContain('type: tv');
    expect(frontmatter).toContain('watchedYear: 2026');
  });
});
