import { EleventyRenderPlugin } from '@11ty/eleventy';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import rss from '@11ty/eleventy-plugin-rss';
import webc from '@11ty/eleventy-plugin-webc';
import { drafts } from './plugins/drafts.js';
import { htmlConfig } from './plugins/html-config.js';
import { markdownLib } from './plugins/markdown.js';
import { syntaxHighlightPlugin } from './plugins/syntaxHighlight.js';
import { webmentions } from './plugins/webmentions.js';

export default {
  EleventyRenderPlugin,
  rss,
  syntaxHighlight: syntaxHighlightPlugin,
  webc,
  eleventyImageTransformPlugin,
  markdownLib,
  drafts,
  htmlConfig,
  webmentions,
};
