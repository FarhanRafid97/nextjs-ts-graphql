import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import { AppProps } from 'next/app';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';
function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    cache: new InMemoryCache(),
  });
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
