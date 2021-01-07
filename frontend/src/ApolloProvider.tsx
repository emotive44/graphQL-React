import App from './App';
import { 
  ApolloClient, 
  InMemoryCache, 
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from "apollo-link-context";


const httpLink = createHttpLink({
  uri: 'http://localhost:5000/api/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink as any) as any,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);