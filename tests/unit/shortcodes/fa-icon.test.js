import {describe, it, expect} from 'vitest';
import {faIconShortcode} from '../../../src/_config/shortcodes/fa-icon.js';

describe('faIconShortcode', () => {
  it('returns an inline SVG with width, height, class and aria-hidden', async () => {
    const svg = await faIconShortcode('magnifying-glass', 'solid', 20);
    expect(svg).toMatch(/^<svg /);
    expect(svg).toMatch(/width="20" height="20"/);
    expect(svg).toMatch(/aria-hidden="true"/);
    expect(svg).not.toMatch(/aria-label/);
  });

  it('renders a brands icon with the Font Awesome license comment', async () => {
    const svg = await faIconShortcode('github', 'brands', 20);
    expect(svg).toMatch(/Font Awesome Free/);
    expect(svg).toMatch(/viewBox="0 0 512 512"/);
  });

  it('sets role="img" and aria-label when ariaLabel is provided', async () => {
    const svg = await faIconShortcode('rss', 'solid', 16, '', 'Meu feed');
    expect(svg).toMatch(/role="img"/);
    expect(svg).toMatch(/aria-label="Meu feed"/);
    expect(svg).not.toMatch(/aria-hidden/);
  });

  it('supports em-based sizes and inline styles', async () => {
    const svg = await faIconShortcode('star', 'solid', '0.75em', '', '', 'color: red');
    expect(svg).toMatch(/width="0.75em" height="0.75em"/);
    expect(svg).toMatch(/style="color: red"/);
  });

  it('escapes quotes in attribute values', async () => {
    const svg = await faIconShortcode('star', 'solid', 20, '', 'nota "5"');
    expect(svg).toMatch(/aria-label="nota &quot;5&quot;"/);
  });

  it('memoizes the optimized SVG across calls', async () => {
    const first = await faIconShortcode('star', 'solid', 20);
    const second = await faIconShortcode('star', 'solid', 20);
    expect(first).toBe(second);
  });

  it('rejects invalid icon names or styles', async () => {
    await expect(faIconShortcode('../x', 'solid')).rejects.toThrow(/Invalid Font Awesome icon/);
    await expect(faIconShortcode('star', '../../x')).rejects.toThrow(/Invalid Font Awesome icon/);
  });

  it('throws a readable error for an unknown icon', async () => {
    await expect(faIconShortcode('does-not-exist', 'solid')).rejects.toThrow();
  });
});
