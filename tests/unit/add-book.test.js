import {describe, it, expect} from 'vitest';
import {PassThrough} from 'node:stream';
import {
  buildFrontmatter,
  buildFilePath,
  createPrompter,
  parseChoice,
  parseRating
} from '../../scripts/lib/add-book.js';

describe('buildFrontmatter', () => {
  it('generate frontmatter for a book with all fields', () => {
    const result = buildFrontmatter({
      title: 'Epilepsia',
      subtitle: 'O que seu médico quer que você saiba',
      author: 'José Ferreira, Nathália Ferreira',
      category: 'Vida Saudável',
      status: 'lido',
      rating: '5',
      poster: 'https://m.media-amazon.com/images/I/810+9VeousL.jpg',
      description: 'Um guia claro, prático e empático.',
      thoughts: 'Uma leitura acessível.',
      quotes: 'Conhecimento é cuidado.',
      attendedYear: '2026',
      recommendBy: 'Comunidade',
      tags: 'Saúde, Epilepsia',
      url: 'https://amzn.to/3OChsgz',
      pubDate: '2026-04-27'
    });

    expect(result).toContain('title: "Epilepsia"');
    expect(result).toContain('subtitle: "O que seu médico quer que você saiba"');
    expect(result).toContain('author: "José Ferreira, Nathália Ferreira"');
    expect(result).toContain('category: "Vida Saudável"');
    expect(result).toContain('status: lido');
    expect(result).toContain('rating: 5');
    expect(result).toContain('poster: "https://m.media-amazon.com/images/I/810+9VeousL.jpg"');
    expect(result).toContain('description: "Um guia claro, prático e empático."');
    expect(result).toContain('thoughts: "Uma leitura acessível."');
    expect(result).toContain('quotes: "Conhecimento é cuidado."');
    expect(result).toContain('attendedYear: 2026');
    expect(result).toContain('recommendBy: "Comunidade"');
    expect(result).toContain(`tags: ["Saúde", "Epilepsia"]`);
    expect(result).toContain('url: "https://amzn.to/3OChsgz"');
    expect(result).toContain('pubDate: 2026-04-27');
  });

  it('omit optional fields when empty', () => {
    const result = buildFrontmatter({title: 'Test', author: 'Autor'});

    expect(result).not.toContain('subtitle:');
    expect(result).not.toContain('thoughts:');
    expect(result).not.toContain('quotes:');
    expect(result).not.toContain('recommendBy:');
  });

  it('default status to lido and current year', () => {
    const result = buildFrontmatter({title: 'Test'});

    expect(result).toContain('status: lido');
    expect(result).toContain(`attendedYear: ${new Date().getFullYear()}`);
  });

  it('handle lendo status', () => {
    const result = buildFrontmatter({title: 'Test', status: 'lendo'});
    expect(result).toContain('status: lendo');
  });

  it('escape double quotes in text fields', () => {
    const result = buildFrontmatter({title: 'O "Livro"', description: 'Diz "olá"'});

    expect(result).toContain('title: "O \\"Livro\\""');
    expect(result).toContain('description: "Diz \\"olá\\""');
  });

  it('parse tags from comma-separated string', () => {
    const result = buildFrontmatter({title: 'Test', tags: 'Ficção, Fantasia , Épico'});
    expect(result).toContain(`tags: ["Ficção", "Fantasia", "Épico"]`);
  });

  it('generate empty tags array when no tags given', () => {
    const result = buildFrontmatter({title: 'Test'});
    expect(result).toContain('tags: []');
  });

  it('accept tags as array', () => {
    const result = buildFrontmatter({title: 'Test', tags: ['A', 'B']});
    expect(result).toContain(`tags: ["A", "B"]`);
  });

  it('always generate valid YAML frontmatter delimiters', () => {
    const result = buildFrontmatter({title: 'Test'});

    expect(result.startsWith('---\n')).toBe(true);
    expect(result.includes('\n---\n')).toBe(true);
  });
});

describe('buildFilePath', () => {
  it('generate path inside the attended year folder', () => {
    const result = buildFilePath({title: 'Duna', attendedYear: '2026', pubDate: '2026-04-27'});
    expect(result.contentDir).toBe('2026');
    expect(result.fileName).toBe('2026-04-27-duna.md');
  });

  it('slugify accented characters for file names', () => {
    const result = buildFilePath({title: 'O último desejo', attendedYear: '2025', pubDate: '2025-12-19'});
    expect(result.fileName).toBe('2025-12-19-o-ultimo-desejo.md');
  });

  it('fall back to current year when missing', () => {
    const result = buildFilePath({title: 'Test', pubDate: '2026-01-01'});
    expect(result.contentDir).toBe(String(new Date().getFullYear()));
  });
});

describe('createPrompter', () => {
  const makeOutput = () => {
    const out = {writes: []};
    out.write = text => out.writes.push(text);
    return out;
  };

  it('resolve answers in order when lines arrive before ask', async () => {
    const input = new PassThrough();
    const prompter = createPrompter(input, makeOutput());
    input.write('primeira\nsegunda\n');

    expect(await prompter.ask('Q1: ')).toBe('primeira');
    expect(await prompter.ask('Q2: ')).toBe('segunda');
    prompter.close();
  });

  it('resolve a pending ask when a line arrives after', async () => {
    const input = new PassThrough();
    const prompter = createPrompter(input, makeOutput());
    const pending = prompter.ask('Q1: ');

    input.write('resposta\n');
    expect(await pending).toBe('resposta');
    prompter.close();
  });

  it('write questions to the output stream', async () => {
    const input = new PassThrough();
    const output = makeOutput();
    const prompter = createPrompter(input, output);
    input.write('x\n');

    await prompter.ask('Título: ');
    expect(output.writes).toEqual(['Título: ']);
    prompter.close();
  });

  it('resolve with empty string on EOF while a question is pending', async () => {
    const input = new PassThrough();
    const prompter = createPrompter(input, makeOutput());
    const pending = prompter.ask('Q1: ');

    input.end();
    expect(await pending).toBe('');
    prompter.close();
  });

  it('resolve remaining asks with empty string after the stream closes', async () => {
    const input = new PassThrough();
    const prompter = createPrompter(input, makeOutput());
    input.end();

    expect(await prompter.ask('Q1: ')).toBe('');
    expect(await prompter.ask('Q2: ')).toBe('');
    prompter.close();
  });
});

describe('parseChoice', () => {
  const options = ['lido', 'lendo'];

  it('pick the option by number', () => {
    expect(parseChoice('1', options)).toBe('lido');
    expect(parseChoice('2', options)).toBe('lendo');
  });

  it('fall back to the default for empty answer', () => {
    expect(parseChoice('', options)).toBe('lido');
  });

  it('fall back to the default for out-of-range numbers', () => {
    expect(parseChoice('0', options)).toBe('lido');
    expect(parseChoice('99', options)).toBe('lido');
  });

  it('fall back to the default for non-numeric answers', () => {
    expect(parseChoice('abc', options)).toBe('lido');
  });
});

describe('parseRating', () => {
  it('return empty string for empty answer', () => {
    expect(parseRating('')).toBe('');
  });

  it('parse a numeric note', () => {
    expect(parseRating('4')).toBe(4);
  });

  it('return empty string for non-numeric answers', () => {
    expect(parseRating('bom')).toBe('');
  });
});

describe('buildFrontmatter + buildFilePath integrados', () => {
  it('generate consistent file path and frontmatter for a book', () => {
    const fields = {
      title: 'Produtividade Redimida',
      author: 'Allen Porto',
      status: 'lido',
      rating: '5',
      attendedYear: '2026',
      url: 'https://amzn.to/4vZq6Gs',
      pubDate: '2026-04-27'
    };

    const frontmatter = buildFrontmatter(fields);
    const {contentDir, fileName} = buildFilePath(fields);

    expect(contentDir).toBe('2026');
    expect(fileName).toBe('2026-04-27-produtividade-redimida.md');
    expect(frontmatter).toContain('status: lido');
    expect(frontmatter).toContain('attendedYear: 2026');
    expect(frontmatter).toContain('pubDate: 2026-04-27');
  });
});
