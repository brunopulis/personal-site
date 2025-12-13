import {defineConfig} from 'tinacms';
import {PostCollection} from './collections/post';
import {PageCollection} from './collections/page';

import {ServiceCollection} from './collections/service';
import {NoteCollection} from './collections/note';
import {BookCollection} from './collections/book';
import {NewsletterCollection} from './collections/newsletter';
import {MediaCollection} from './collections/media';
import {BookmarkCollection} from './collections/bookmark';
import {StreamCollection} from './collections/stream';
import {TalkCollection} from './collections/talk';
import {GalleryCollection} from './collections/gallery';

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, // Get this from tina.io
  token: process.env.TINA_TOKEN, // Get this from tina.io
  build: {
    outputFolder: 'admin',
    publicFolder: 'dist'
  },
  media: {
    tina: {
      mediaRoot: 'assets/images',
      publicFolder: 'src'
    }
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
      GalleryCollection
    ]
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ['por']
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  }
});
