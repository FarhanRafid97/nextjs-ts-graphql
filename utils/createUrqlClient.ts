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
import { pipe, tap } from 'wonka';
import { Exchange } from 'urql';
import Router from 'next/router';

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        // If the OperationResult has an error send a request to sentry
        if (error?.message.includes('not authenticated')) {
          Router.replace('/login');
        }
      })
    );
  };

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
          // createPost: (_result, args, cache, info) => {
          //   betterUpdateQuery<CreatePostMutation, PostsQuery>(
          //     cache,
          //     { query: PostsDocument },
          //     _result,
          //     (result, query) => {
          //       if(!result){
          //         return un
          //       }

          //       return result.crea
          //     }
          //   );
          // },
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
    errorExchange,
    ssrExchange,
    fetchExchange,
  ],
});
