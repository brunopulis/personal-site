import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {localPoster} from '../../../src/_config/filters/localPoster.js';

const TMDB_URL = 'https://image.tmdb.org/t/p/w600_and_h900_face/abc.jpg';

let fixtureDir;

beforeEach(() => {
  fixtureDir = fs.mkdtempSync(path.join(os.tmpdir(), 'poster-filter-'));
  const posters = path.join(fixtureDir, 'src', 'assets', 'images', 'posters');
  fs.mkdirSync(posters, {recursive: true});
  fs.writeFileSync(path.join(posters, 'abc.jpg'), 'conteudo');
  vi.spyOn(process, 'cwd').mockReturnValue(fixtureDir);
});

afterEach(() => {
  vi.restoreAllMocks();
  fs.rmSync(fixtureDir, {recursive: true, force: true});
});

describe('localPoster', () => {
  it('maps a tmdb url to the local poster path when the file exists', () => {
    expect(localPoster(TMDB_URL)).toBe('/assets/images/posters/abc.jpg');
  });

  it('falls back to the remote url when the local poster is missing', () => {
    const missing = 'https://image.tmdb.org/t/p/w600_and_h900_face/nao-existe.jpg';
    expect(localPoster(missing)).toBe(missing);
  });

  it('leaves non-tmdb urls untouched', () => {
    const url = 'https://img.example.com/capa.jpg';
    expect(localPoster(url)).toBe(url);
  });

  it('leaves empty values untouched', () => {
    expect(localPoster('')).toBe('');
    expect(localPoster(undefined)).toBeUndefined();
  });
});
