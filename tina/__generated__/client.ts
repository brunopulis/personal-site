import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'd686461d60a8bd553e1996561adc32c395e5d688', queries,  });
export default client;
  