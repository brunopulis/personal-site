import markdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import markdownItPrism from 'markdown-it-prism';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItLinkAttributes from 'markdown-it-link-attributes';
import {full as markdownItEmoji} from 'markdown-it-emoji';
import markdownItFootnote from 'markdown-it-footnote';
import markdownitMark from 'markdown-it-mark';
import markdownitAbbr from 'markdown-it-abbr';
import {slugifyString} from '../filters/slugify.js';

export const markdownLib = markdownIt({
  sanitize: true,
  breaks: true,
  linkify: true,
  typographer: true
})
  .disable('code')
  .use(markdownItAttrs)
  .use(markdownItPrism, {
    defaultLanguage: 'plaintext'
  })
  .use(markdownItAnchor, {
    slugify: slugifyString,
    tabIndex: false,
    permalink: markdownItAnchor.permalink.headerLink({
      class: 'heading-anchor'
    })
  })
  .use(markdownItClass, {})
  .use(markdownItLinkAttributes, [
    {
      // match external links
      matcher(href) {
        return href.match(/^https?:\/\//);
      },
      attrs: {
        rel: 'noopener'
      }
    }
  ])
  .use(markdownItEmoji)
  .use(markdownItFootnote)
  .use(markdownitMark)
  .use(markdownitAbbr)
  .use(md => {
    // Helper function to escape HTML entities
    const escapeHtml = text => {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return text.replaceAll(/[&<>"']/g, m => map[m]);
    };

    md.renderer.rules.image = (tokens, idx) => {
      const token = tokens[idx];
      const src = token.attrGet('src');
      const alt = escapeHtml(token.content || '');
      const caption = token.attrGet('title');

      // Collect attributes
      const attributes = token.attrs || [];
      const hasEleventyWidths = attributes.some(([key]) => key === 'eleventy:widths');
      if (!hasEleventyWidths) {
        attributes.push(['eleventy:widths', '650,960,1400']);
      }

      const attributesString = attributes.map(([key, value]) => `${key}="${escapeHtml(value)}"`).join(' ');
      const imgTag = `<img src="${src}" alt="${alt}" ${attributesString}>`;
      return caption ? `<figure>${imgTag}<figcaption>${escapeHtml(caption)}</figcaption></figure>` : imgTag;
    };
  });
