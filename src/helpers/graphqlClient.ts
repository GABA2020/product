import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const link = new HttpLink({
  uri: 'https://content-mackerel-67.hasura.app/v1/graphql',
});
const cache = new InMemoryCache();
const graphQLClient = new ApolloClient({
  link,
  cache,
});
export { graphQLClient };
