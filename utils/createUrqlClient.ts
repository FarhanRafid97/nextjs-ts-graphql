import { cacheExchange } from '@urql/exchange-graphcache';
import { dedupExchange, fetchExchange } from 'urql';
import {
  LoginMutation,
  LogoutMutation,
  MyBioDocument,
  MyBioQuery,
  RegisterMutation,
} from '../src/generated/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MyBioQuery>(
              cache,
              {
                query: MyBioDocument,
              },
              _result,
              () => ({ myBio: null })
            );
          },
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
    ssrExchange,
    fetchExchange,
  ],
});
