import { EleventyRenderPlugin } from '@11ty/eleventy';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import rss from '@11ty/eleventy-plugin-rss';
import webc from '@11ty/eleventy-plugin-webc';

import {markdownLib} from './plugins/markdown.js';
import {drafts} from './plugins/drafts.js';
import {webmentions} from './plugins/webmentions.js';

import {htmlConfig} from './plugins/html-config.js';

export default {
  EleventyRenderPlugin,
  rss,
  syntaxHighlight,
  webc,
  eleventyImageTransformPlugin,
  markdownLib,
  drafts,
  htmlConfig,
  webmentions
};
