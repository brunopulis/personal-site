import {describe, it, expect} from 'vitest';
import {validateSchema} from '../../scripts/schemas/schema-validator.js';
import {bookSchema} from '../../scripts/schemas/book.js';
import {buildMovieSchema} from '../../scripts/schemas/movie.js';
import {buildShowSchema} from '../../scripts/schemas/show.js';

describe('validateSchema', () => {
  it('aceita o bookSchema real sem lançar erro', () => {
    expect(() => validateSchema(bookSchema)).not.toThrow();
  });

  it('aceita o movieSchema real sem lançar erro', () => {
    expect(() => validateSchema(buildMovieSchema())).not.toThrow();
  });

  it('aceita o showSchema real sem lançar erro', () => {
    expect(() => validateSchema(buildShowSchema())).not.toThrow();
  });

  it('rejeita campo type=choice sem options', () => {
    const badSchema = {
      type: 'book',
      contentDir: () => 'x',
      fileName: () => 'x.md',
      fields: [
        {key: 'status', label: 'Status', type: 'choice'} // faltou options
      ]
    };
    expect(() => validateSchema(badSchema)).toThrow(/options/);
  });

  it('rejeita fields com key duplicada', () => {
    const badSchema = {
      type: 'book',
      contentDir: () => 'x',
      fileName: () => 'x.md',
      fields: [
        {key: 'title', label: 'Título'},
        {key: 'title', label: 'Título de novo'} // duplicado
      ]
    };
    expect(() => validateSchema(badSchema)).toThrow(/duplicada/);
  });

  it('rejeita schema sem contentDir', () => {
    const badSchema = {
      type: 'book',
      fileName: () => 'x.md',
      fields: [{key: 'title', label: 'Título'}]
    };
    expect(() => validateSchema(badSchema)).toThrow();
  });

  it('rejeita fields vazio', () => {
    const badSchema = {
      type: 'book',
      contentDir: () => 'x',
      fileName: () => 'x.md',
      fields: []
    };
    expect(() => validateSchema(badSchema)).toThrow();
  });
});
