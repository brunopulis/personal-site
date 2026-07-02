import { describe, it, expect } from 'vitest';
import { extractCategory } from '../src/_data/categoriesData.js';

describe('extractCategory', () => {
  it('extract category from frontmatter with YAML value', () => {
    const content = `---
title: My Post
category: Acessibilidade
tags:
  - a11y
---`;
    expect(extractCategory(content)).toBe('Acessibilidade');
  });

  it('extract category from frontmatter with single-quoted value', () => {
    const content = `---
title: My Post
category: 'Teologia'
tags:
  - cristianismo
---`;
    expect(extractCategory(content)).toBe('Teologia');
  });

  it('extract category from frontmatter with double-quoted value', () => {
    const content = `---
title: My Post
category: "Frontend"
---`;
    expect(extractCategory(content)).toBe('Frontend');
  });

  it('extract category when category is before other keys', () => {
    const content = `---
category: Carreira
title: My Post
pubDate: 2024-01-01
---`;
    expect(extractCategory(content)).toBe('Carreira');
  });

  it('return null when no category key in frontmatter', () => {
    const content = `---
title: My Post
tags:
  - a11y
---`;
    expect(extractCategory(content)).toBeNull();
  });

  it('return null when no frontmatter at all', () => {
    const content = '# Just a title\n\nSome content.';
    expect(extractCategory(content)).toBeNull();
  });

  it('return null for empty content', () => {
    expect(extractCategory('')).toBeNull();
  });

  it('return null when category value is empty', () => {
    const content = `---
title: My Post
category:
tags:
  - a11y
---`;
    expect(extractCategory(content)).toBeNull();
  });

  it('extract category with special characters in value', () => {
    const content = `---
category: Tecnologia & Sociedade
title: My Post
---`;
    expect(extractCategory(content)).toBe('Tecnologia & Sociedade');
  });

  it('extract category from frontmatter with leading whitespace in value', () => {
    const content = `---
category:   Produtividade
title: My Post
---`;
    expect(extractCategory(content)).toBe('Produtividade');
  });

  it('extract category ignoring other keys in frontmatter', () => {
    const content = `---
title: Test
pubDate: 2024-01-01
description: A post
category: Pessoal
tags:
  - pessoal
author: Bruno
---`;
    expect(extractCategory(content)).toBe('Pessoal');
  });

  it('extract category with hyphenated name', () => {
    const content = `---
category: User Experience
title: My Post
---`;
    expect(extractCategory(content)).toBe('User Experience');
  });

  it('extract category with numbers', () => {
    const content = `---
category: Web3
title: My Post
---`;
    expect(extractCategory(content)).toBe('Web3');
  });

  it('extract category with mixed case', () => {
    const content = `---
category: DevOps
title: My Post
---`;
    expect(extractCategory(content)).toBe('DevOps');
  });

  it('return null when category key is after tags section in YAML', () => {
    const content = `---
title: My Post
tags:
  - a11y
category: Acessibilidade
---`;
    expect(extractCategory(content)).toBe('Acessibilidade');
  });
});
