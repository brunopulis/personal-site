import { defineConfig } from 'tinacms';
import { BookCollection } from './collections/book';
import { BookmarkCollection } from './collections/bookmark';
import { GalleryCollection } from './collections/gallery';
import { MediaCollection } from './collections/media';
import { NewsletterCollection } from './collections/newsletter';
import { NoteCollection } from './collections/note';
import { PageCollection } from './collections/page';
import { PostCollection } from './collections/post';
import { ServiceCollection } from './collections/service';
import { StreamCollection } from './collections/stream';
import { TalkCollection } from './collections/talk';

const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';
const _isLocal = !process.env.TINA_SEARCH;

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: './',
  },
  media: {
    tina: {
      mediaRoot: 'assets/images',
      publicFolder: 'src',
    },
  },
  schema: {
    collections: [
      PostCollection,
      PageCollection,
      ServiceCollection,
      NoteCollection,
      BookCollection,
      NewsletterCollection,
      MediaCollection,
      BookmarkCollection,
      StreamCollection,
      TalkCollection,
      GalleryCollection,
    ],
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH,
      stopwordLanguages: ['por'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});
