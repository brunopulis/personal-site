import {describe, it, expect} from 'vitest';
import {
  buildFrontmatter,
  buildFilePath,
  buildReviewBody,
  collectBookInput
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

describe('buildReviewBody', () => {
  it('include all review sections', () => {
    const body = buildReviewBody();

    expect(body).toContain('## O livro em 3 frases');
    expect(body).toContain('## Impressões');
    expect(body).toContain('## Como eu descobri esse livro?');
    expect(body).toContain('## Quem deve ler?');
    expect(body).toContain('## Como o livro me mudou');
    expect(body).toContain('## Minhas 3 melhores citações');
    expect(body).toContain('## Resumo + Notas');
  });
});

describe('collectBookInput', () => {
  const makeAsk = answers => {
    const queue = [...answers];
    return async () => queue.shift() ?? '';
  };

  it('collect all book fields from prompted answers', async () => {
    const ask = makeAsk([
      'Livro Título',
      '',
      'Autor',
      'Categoria',
      '2',
      '4',
      '2024',
      '',
      'Descrição',
      '',
      '',
      '',
      'Ficção, Drama',
      '',
      '2024-03-10'
    ]);

    const book = await collectBookInput(ask, 'Sugerido');

    expect(book.title).toBe('Livro Título');
    expect(book.subtitle).toBe('');
    expect(book.author).toBe('Autor');
    expect(book.category).toBe('Categoria');
    expect(book.status).toBe('lendo');
    expect(book.rating).toBe(4);
    expect(book.attendedYear).toBe('2024');
    expect(book.description).toBe('Descrição');
    expect(book.pubDate).toBe('2024-03-10');
  });

  it('use suggested title when answer is empty', async () => {
    const ask = makeAsk(['']);
    const book = await collectBookInput(ask, 'Título Sugerido');
    expect(book.title).toBe('Título Sugerido');
  });

  it('fall back to defaults for empty answers', async () => {
    let titleAsked = false;
    const askFor = async question => {
      if (question.startsWith('Título')) {
        if (!titleAsked) {
          titleAsked = true;
          return 'Livro';
        }
        return '';
      }
      if (question.startsWith('Escolha')) return '1';
      if (question.startsWith('Ano de leitura')) return '';
      if (question.startsWith('Data de leitura')) return '';
      return '';
    };

    const book = await collectBookInput(askFor, '');

    expect(book.title).toBe('Livro');
    expect(book.status).toBe('lido');
    expect(book.attendedYear).toBe(String(new Date().getFullYear()));
    expect(book.pubDate).toBe(new Date().toISOString().slice(0, 10));
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
