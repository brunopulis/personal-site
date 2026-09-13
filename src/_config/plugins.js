// Eleventy
import {EleventyRenderPlugin} from '@11ty/eleventy';
import rss from '@11ty/eleventy-plugin-rss';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import {eleventyImageTransformPlugin} from '@11ty/eleventy-img';

// custom
import {markdownLib} from './plugins/markdown.js';
import {drafts} from './plugins/drafts.js';

// Custom transforms
import {htmlConfig} from './plugins/html-config.js';

export default {
  EleventyRenderPlugin,
  rss,
  syntaxHighlight,
  eleventyImageTransformPlugin,
  markdownLib,
  drafts,
  htmlConfig
};
