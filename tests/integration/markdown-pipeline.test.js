import { markdownFormat } from '../../src/_config/filters/markdown-format.js';
import { slugifyString } from '../../src/_config/filters/slugify.js';
import { striptags } from '../../src/_config/filters/striptags.js';
import { markdownLib } from '../../src/_config/plugins/markdown.js';

describe('Markdown Pipeline Integration', () => {
  describe('markdownLib (full pipeline)', () => {
    test('should render heading with anchor', () => {
      const result = markdownLib.render('# My Heading');
      expect(result).toContain('id="my-heading"');
      expect(result).toContain('heading-anchor');
    });

    test('should render code block with prism', () => {
      const result = markdownLib.render('```js\nconst x = 1\n```');
      expect(result).toContain('language-js');
    });

    test('should render external links with rel="noopener"', () => {
      const result = markdownLib.render('[Link](http://example.com)');
      expect(result).toContain('rel="noopener"');
    });

    test('should render internal links without noopener', () => {
      const result = markdownLib.render('[Link](/internal)');
      expect(result).not.toContain('rel="noopener"');
    });

    test('should render emoji shortcuts', () => {
      const result = markdownLib.render(':)');
      expect(result).toMatch(/[🙂😃]/u);
    });

    test('should render footnotes', () => {
      const result = markdownLib.render('Here is a footnote[^1]\n\n[^1]: This is the footnote.');
      expect(result).toContain('footnote-ref');
    });

    test('should render marked text', () => {
      const result = markdownLib.render('==highlighted==');
      expect(result).toContain('mark');
    });

    test('should render abbreviations', () => {
      const result = markdownLib.render('*[HTML]: Hyper Text Markup Language\n\nHTML is great.');
      expect(result).toContain('title="Hyper Text Markup Language"');
    });

    test('should add default widths to images', () => {
      const result = markdownLib.render('![alt](image.jpg)');
      expect(result).toContain('eleventy:widths');
    });

    test('should render image with caption as figure', () => {
      const result = markdownLib.render('![alt](image.jpg "My Caption")');
      expect(result).toContain('<figure>');
      expect(result).toContain('<figcaption>');
    });
  });

  describe('Chained filters: markdownFormat + striptags', () => {
    test('should convert markdown to HTML then strip tags', () => {
      const markdown = '## Hello **World**';
      const html = markdownFormat(markdown);
      const plainText = striptags(html);
      expect(plainText).toContain('Hello');
      expect(plainText).toContain('World');
    });

    test('should handle complex markdown chain', () => {
      const markdown = '# Title\n\n- Item 1\n- Item 2\n\n[Link](http://test.com)';
      const html = markdownFormat(markdown);
      const plainText = striptags(html);
      expect(plainText).toContain('Title');
      expect(plainText).toContain('Item 1');
      expect(plainText).toContain('Item 2');
      expect(plainText).toContain('Link');
    });
  });

  describe('Slugify integration with markdown anchors', () => {
    test('should use same slugify for heading anchors', () => {
      const heading = '## Test & Examples';
      const result = markdownLib.render(heading);
      const expectedSlug = slugifyString('Test & Examples');
      expect(result).toContain(`id="${expectedSlug}"`);
    });

    test('should handle special characters in headings', () => {
      const heading = '# Chapter 1: Intro';
      const result = markdownLib.render(heading);
      expect(result).toContain('id="chapter-1-intro"');
    });
  });

  describe('Full content pipeline', () => {
    test('should process full blog post content', () => {
      const content = `# My Blog Post

This is **bold** and *italic* text.

## Code Example

\`\`\`javascript
console.log('Hello');
\`\`\`

Check out [this link](https://example.com).

![Image](image.jpg "Optional caption")
`;

      const html = markdownFormat(content);
      expect(html).toContain('<h1>');
      expect(html).toContain('<strong>');
      expect(html).toContain('<em>');
      expect(html).toContain('<a href="https://example.com"');
    });

    test('should strip HTML and leave plain text', () => {
      const content = `# Title\n\n[Link](http://test.com)\n\n**Bold text**`;
      const plainText = striptags(markdownFormat(content));
      expect(plainText).toContain('Title');
      expect(plainText).toContain('Link');
      expect(plainText).toContain('Bold text');
    });
  });
});
