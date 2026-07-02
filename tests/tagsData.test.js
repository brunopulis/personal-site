import { describe, it, expect } from 'vitest';
import { toSlug, extractTags } from '../src/_data/tags-helpers.js';

describe('toSlug', () => {
  it('convert to lowercase', () => {
    expect(toSlug('JavaScript')).toBe('javascript');
  });

  it('replace spaces with hyphens', () => {
    expect(toSlug('100 Days To OffLoad')).toBe('100-days-to-offload');
  });

  it('remove special characters', () => {
    expect(toSlug('a11y!')).toBe('a11y');
  });

  it('handle camelCase', () => {
    expect(toSlug('100DaysToOffLoad')).toBe('100daystooffload');
  });

  it('strip leading hyphens', () => {
    expect(toSlug('-leading')).toBe('leading');
  });

  it('strip trailing hyphens', () => {
    expect(toSlug('trailing-')).toBe('trailing');
  });

  it('handle empty string', () => {
    expect(toSlug('')).toBe('');
  });

  it('handle tag with numbers only', () => {
    expect(toSlug('100')).toBe('100');
  });

  it('replace accented characters with ASCII equivalents via NFD', () => {
    expect(toSlug('Educação')).toBe('educacao');
  });

  it('handle Portuguese words with cedilha', () => {
    expect(toSlug('Coração')).toBe('coracao');
  });

  it('handle multiple accented words', () => {
    expect(toSlug('Vida Cristã')).toBe('vida-crista');
  });

  it('handle mixed ASCII and accented text', () => {
    expect(toSlug('São Paulo')).toBe('sao-paulo');
  });

  it('handle words with tilde', () => {
    expect(toSlug('Ação')).toBe('acao');
  });

  it('handle words with acute and circumflex accents', () => {
    expect(toSlug('Você está ótimo')).toBe('voce-esta-otimo');
  });
});

describe('extractTags', () => {
  it('parse YAML list format', () => {
    const content = `---
title: My Post
tags:
  - a11y
  - javascript
---`;
    expect(extractTags(content)).toEqual(['a11y', 'javascript']);
  });

  it('parse YAML list with single tag', () => {
    const content = `---
tags:
  - 100DaysToOffLoad
---`;
    expect(extractTags(content)).toEqual(['100DaysToOffLoad']);
  });

  it('parse inline array format with single quotes', () => {
    const content = `---
tags: ['a11y', 'javascript']
---`;
    expect(extractTags(content)).toEqual(['a11y', 'javascript']);
  });

  it('parse inline array format without spaces', () => {
    const content = `---
tags: ['a11y','javascript']
---`;
    expect(extractTags(content)).toEqual(['a11y', 'javascript']);
  });

  it('parse inline array with single tag', () => {
    const content = `---
tags: ['100DaysToOffLoad']
---`;
    expect(extractTags(content)).toEqual(['100DaysToOffLoad']);
  });

  it('return empty array when no tags key', () => {
    const content = `---
title: My Post
pubDate: 2024-01-01
---`;
    expect(extractTags(content)).toEqual([]);
  });

  it('return empty array when no frontmatter', () => {
    const content = '# Just a title\n\nSome content.';
    expect(extractTags(content)).toEqual([]);
  });

  it('return empty array for empty content', () => {
    expect(extractTags('')).toEqual([]);
  });

  it('parse YAML list with quoted items', () => {
    const content = `---
tags:
  - 'a11y'
  - 'javascript'
---`;
    expect(extractTags(content)).toEqual(['a11y', 'javascript']);
  });

  it('handle tags with numbers and letters', () => {
    const content = `---
tags:
  - 100DaysToOffLoad
  - css3
  - html5
---`;
    expect(extractTags(content)).toEqual(['100DaysToOffLoad', 'css3', 'html5']);
  });

  it('ignore other frontmatter keys', () => {
    const content = `---
title: Test
pubDate: 2024-01-01
tags:
  - a11y
description: A test post
---`;
    expect(extractTags(content)).toEqual(['a11y']);
  });

  it('handle multiple frontmatter keys before tags', () => {
    const content = `---
title: Test
pubDate: 2024-01-01
type: post
tags:
  - 100DaysToOffLoad
  - pessoal
---`;
    expect(extractTags(content)).toEqual(['100DaysToOffLoad', 'pessoal']);
  });

  it('ignore tags with empty value in YAML list', () => {
    const content = `---
tags:
  - a11y
  -
  - javascript
---`;
    expect(extractTags(content)).toEqual(['a11y', 'javascript']);
  });
});
