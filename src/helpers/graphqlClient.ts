import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const link = new HttpLink({
  uri: 'https://us-central1-august-water-280101.cloudfunctions.net/resourceApi',
});
const cache = new InMemoryCache();
const graphQLClient = new ApolloClient({
  link,
  cache,
});
export { graphQLClient };
