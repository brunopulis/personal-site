import {describe, it, expect, vi, beforeEach} from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {extractPosterUrls, isSkipped, syncPosters} from '../../scripts/sync-posters.js';

const http = vi.hoisted(() => {
  const state = {queue: [], error: null, calls: []};
  return {
    state,
    get(url, callback) {
      const handlers = {};
      state.calls.push(String(url));
      const req = {
        setTimeout: vi.fn(() => req),
        on: (event, handler) => {
          handlers[event] = handler;
          return req;
        },
        end: vi.fn(() => {
          queueMicrotask(() => {
            if (state.error) {
              handlers.error?.(state.error);
            } else if (state.queue.length > 0) {
              callback(state.queue.shift());
            } else {
              handlers.error?.(new Error('no response queued'));
            }
          });
          return req;
        })
      };
      return req;
    }
  };
});

vi.mock('node:https', () => ({get: http.get}));

function makeResponse({statusCode = 200, contentType = 'image/jpeg', body, location}) {
  const headers = {...(location ? {location} : {})};
  if (contentType !== null) headers['content-type'] = contentType;
  return {
    statusCode,
    headers,
    resume() {},
    destroy() {},
    pipe(stream) {
      if (body) stream.write(body);
      stream.end();
      return stream;
    },
    on() {
      return this;
    }
  };
}

function makeFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'posters-sync-'));
  const poster = path.join(root, 'src', 'assets', 'images', 'posters');
  fs.mkdirSync(poster, {recursive: true});
  return {root, poster};
}

function writeContent(root, relative, content) {
  const file = path.join(root, relative);
  fs.mkdirSync(path.dirname(file), {recursive: true});
  fs.writeFileSync(file, content);
}

const TMDB_URL = 'https://image.tmdb.org/t/p/w600_and_h900_face/abc.jpg';

beforeEach(() => {
  delete process.env.SKIP_FETCH_ASSETS;
  http.state.queue = [];
  http.state.error = null;
  http.state.calls = [];
});

describe('extractPosterUrls', () => {
  it('collects tmdb poster urls from a content file', () => {
    const {root} = makeFixture();
    writeContent(
      root,
      'src/content/watching/movies/2026/exemplo.md',
      ['---', 'title: "Exemplo"', `poster: ${TMDB_URL}`, '---', 'Corpo do texto.'].join('\n')
    );

    expect(extractPosterUrls(path.join(root, 'src/content/watching/movies/2026/exemplo.md'))).toEqual([
      TMDB_URL
    ]);
  });

  it('ignores quoted values, non-tmdb urls and empty posters', () => {
    const {root} = makeFixture();
    const file = path.join(root, 'src/content/watching/movies/2026/exemplo.md');
    writeContent(
      root,
      'src/content/watching/movies/2026/exemplo.md',
      ['---', `poster: "${TMDB_URL}"`, 'poster: https://img.example.com/outro.jpg', 'poster:', '---'].join(
        '\n'
      )
    );

    expect(extractPosterUrls(file)).toEqual([TMDB_URL]);
  });

  it('returns an empty list for files without a tmdb poster', () => {
    const {root} = makeFixture();
    const file = path.join(root, 'src/content/watching/movies/2026/exemplo.md');
    writeContent(root, 'src/content/watching/movies/2026/exemplo.md', 'title: "Sem poster"\n');

    expect(extractPosterUrls(file)).toEqual([]);
  });
});

describe('isSkipped', () => {
  it('returns false when the env var is unset', () => {
    expect(isSkipped()).toBe(false);
  });

  it('returns true when SKIP_FETCH_ASSETS is set', () => {
    process.env.SKIP_FETCH_ASSETS = '1';
    expect(isSkipped()).toBe(true);
    process.env.SKIP_FETCH_ASSETS = 'true';
    expect(isSkipped()).toBe(true);
  });
});

describe('syncPosters', () => {
  it('skips downloads when SKIP_FETCH_ASSETS is set', async () => {
    const {root} = makeFixture();
    writeContent(root, 'src/content/watching/movies/2026/exemplo.md', `poster: ${TMDB_URL}`);
    process.env.SKIP_FETCH_ASSETS = '1';

    await syncPosters(root);

    expect(http.state.calls).toEqual([]);
    expect(fs.readdirSync(path.join(root, 'src/assets/images/posters'))).toEqual([]);
  });

  it('returns silently when the watching directory does not exist', async () => {
    const {root} = makeFixture();

    await syncPosters(root);

    expect(http.state.calls).toEqual([]);
  });

  it('does not download posters that already exist locally', async () => {
    const {root, poster} = makeFixture();
    writeContent(root, 'src/content/watching/movies/2026/exemplo.md', `poster: ${TMDB_URL}`);
    fs.writeFileSync(path.join(poster, 'abc.jpg'), 'existe');
    http.state.queue.push(makeResponse({body: Buffer.from('baixado')}));

    await syncPosters(root);

    expect(http.state.calls).toEqual([]);
    expect(fs.readFileSync(path.join(poster, 'abc.jpg'), 'utf8')).toBe('existe');
  });

  it('downloads missing posters into src/assets/images/posters', async () => {
    const {root, poster} = makeFixture();
    writeContent(root, 'src/content/watching/movies/2026/exemplo.md', `poster: ${TMDB_URL}`);
    http.state.queue.push(makeResponse({body: Buffer.from('poster-bytes')}));

    await syncPosters(root);

    expect(http.state.calls).toEqual([TMDB_URL]);
    expect(fs.readFileSync(path.join(poster, 'abc.jpg'))).toEqual(Buffer.from('poster-bytes'));
    expect(fs.existsSync(path.join(poster, 'abc.jpg.tmp'))).toBe(false);
  });

  it('follows redirects from image.tmdb.org hosts', async () => {
    const {root, poster} = makeFixture();
    writeContent(root, 'src/content/watching/movies/2026/exemplo.md', `poster: ${TMDB_URL}`);
    http.state.queue.push(
      makeResponse({statusCode: 302, contentType: null, location: `${TMDB_URL}?redirect=1`}),
      makeResponse({body: Buffer.from('redirecionado')})
    );

    await syncPosters(root);

    expect(http.state.calls).toEqual([TMDB_URL, `${TMDB_URL}?redirect=1`]);
    expect(fs.readFileSync(path.join(poster, 'abc.jpg'))).toEqual(Buffer.from('redirecionado'));
  });

  it('does not write files when the download is rejected (non-image content-type)', async () => {
    const {root, poster} = makeFixture();
    writeContent(root, 'src/content/watching/movies/2026/exemplo.md', `poster: ${TMDB_URL}`);
    http.state.queue.push(makeResponse({contentType: 'text/html', body: Buffer.from('<html>')}));

    await syncPosters(root);

    expect(fs.existsSync(path.join(poster, 'abc.jpg'))).toBe(false);
    expect(fs.existsSync(path.join(poster, 'abc.jpg.tmp'))).toBe(false);
  });

  it('warns and keeps going when a network failure occurs', async () => {
    const {root, poster} = makeFixture();
    writeContent(root, 'src/content/watching/movies/2026/exemplo.md', `poster: ${TMDB_URL}`);
    http.state.error = new Error('ECONNRESET');

    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await syncPosters(root);

    expect(fs.existsSync(path.join(poster, 'abc.jpg'))).toBe(false);
    expect(warn).toHaveBeenCalled();
  });

  it('downloads a duplicate poster across files only once', async () => {
    const {root, poster} = makeFixture();
    writeContent(root, 'src/content/watching/movies/2026/a.md', `poster: ${TMDB_URL}`);
    writeContent(root, 'src/content/watching/shows/2026/b.md', `poster: ${TMDB_URL}`);
    http.state.queue.push(makeResponse({body: Buffer.from('uma-vez')}));

    await syncPosters(root);

    expect(http.state.calls).toEqual([TMDB_URL]);
    expect(fs.readFileSync(path.join(poster, 'abc.jpg'))).toEqual(Buffer.from('uma-vez'));
  });
});
