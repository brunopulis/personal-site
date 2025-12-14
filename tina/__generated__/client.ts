import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '843e6f43d8716c74ab285afa09a227ede51e7f9c', queries,  });
export default client;
  