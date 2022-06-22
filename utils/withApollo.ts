import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';
import { withApollo } from 'next-apollo';
import {
  InputProfile,
  MyBioQuery,
  PaginatedPosts,
} from '../src/generated/graphql';

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    headers: {
      cookie:
        (typeof window === 'undefined'
          ? ctx?.req?.headers.cookie
          : undefined) || '',
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: [],
              merge(
                existing: PaginatedPosts | undefined,
                incoming: PaginatedPosts
              ): PaginatedPosts {
                console.log('posts apollo', existing);
                console.log('posts apollo', incoming);
                return {
                  ...incoming,
                  posts: [...(existing?.posts || []), ...incoming.posts],
                };
              },
            },
          },
        },
      },
    }),
  });

export default withApollo(createClient);
