import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { createClient, fetchExchange, Provider, dedupExchange } from 'urql';
import { cacheExchange, Cache, QueryInput } from '@urql/exchange-graphcache';
import theme from '../theme';
import { AppProps } from 'next/app';
import {
  LoginMutation,
  MyBioDocument,
  MyBioQuery,
  RegisterMutation,
} from '../src/generated/graphql';

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          loginUser: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MyBioQuery>(
              cache,
              { query: MyBioDocument },
              _result,
              (result, query) => {
                if (result.loginUser.error) {
                  return query;
                } else {
                  return {
                    myBio: result.loginUser.user,
                  };
                }
              }
            );
          },
          createUser: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MyBioQuery>(
              cache,
              { query: MyBioDocument },
              _result,
              (result, query) => {
                if (result.createUser.error) {
                  return query;
                } else {
                  return {
                    myBio: result.createUser.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
