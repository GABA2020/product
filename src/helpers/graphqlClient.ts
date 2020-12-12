import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { WebSocketLink } from "@apollo/client/link/ws";

const link = new WebSocketLink({
  uri: 'wss://hasura.gabadev.co/v1/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': 'gabadev123!'
      }
    }
  }
});
const cache = new InMemoryCache();
const graphQLClient = new ApolloClient({
  link,
  cache,
});
export { graphQLClient };
