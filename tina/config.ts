import { defineConfig } from "tinacms";
import { BlogCollection } from "./collections/blog";
import { BlogrollCollection } from "./collections/blogroll";
import { NotasCollection } from "./collections/notas";
import { BibliotecaCollection } from "./collections/biblioteca";
import { MoviesCollection } from "./collections/movies";
import { NewsletterCollection } from "./collections/newsletter";
import { SpeakingCollection } from "./collections/speaking";

const branch =
  process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";

export default defineConfig({
  branch,
  clientId: process.env.PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      BlogCollection,
      NotasCollection,
      BlogrollCollection,
      BibliotecaCollection,
      MoviesCollection,
      NewsletterCollection,
      SpeakingCollection,
    ],
  },
});
