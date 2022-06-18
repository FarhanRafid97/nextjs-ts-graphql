import { cacheExchange, Resolver } from '@urql/exchange-graphcache';
import {
  dedupExchange,
  fetchExchange,
  Exchange,
  stringifyVariables,
} from 'urql';
import {
  LoginMutation,
  LogoutMutation,
  MyBioDocument,
  MyBioQuery,
  RegisterMutation,
} from '../src/generated/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';
import { pipe, tap } from 'wonka';

import Router from 'next/router';
import { kill } from 'process';

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

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    console.log(entityKey, fieldName);
    const allFields = cache.inspectFields(entityKey);
    console.log('allFields: ', allFields);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolveFieldByKey(entityKey, fieldKey);
    console.log(fieldInfos);
    info.partial = !isItInTheCache;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const data = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string[];
      results.push(...data);
    });

    return results;
  };
};

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include' as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      resolvers: {
        Query: {
          posts: cursorPagination(),
        },
      },
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
    errorExchange,
    ssrExchange,
    fetchExchange,
  ],
});
