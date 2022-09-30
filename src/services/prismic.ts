import * as prismic from '@prismicio/client';
import { HttpRequestLike } from '@prismicio/client';
// import { enableAutoPreviews } from '@prismicio/next';

export interface PrismicConfig {
  req?: HttpRequestLike;
}

export function getPrismicClient(config: PrismicConfig): prismic.Client {
  const endpoint = prismic.getRepositoryEndpoint('spacetraveling1321312');
  const client = prismic.createClient(endpoint);

  // enableAutoPreviews({
  //   client,
  //   req: config.req,
  // });

  return client;
}
