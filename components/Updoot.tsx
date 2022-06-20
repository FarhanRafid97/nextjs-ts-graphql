import { Flex, Icon, Text, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  PostsSnippetFragment,
  useVoteMutation,
  VoteMutation,
} from '../src/generated/graphql';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ApolloCache, useApolloClient } from '@apollo/client';
import { useIsAuth } from '../utils/useIsAuth';
import withApollo from '../utils/withApollo';
import gql from 'graphql-tag';

interface UpdootProps {
  post: PostsSnippetFragment;
}
type LoadingType = 'upvote-loading' | 'downvote-loading' | 'no-loading';

const Updoot: React.FC<UpdootProps> = ({ post }) => {
  const [loading, setLoading] = useState<LoadingType>('no-loading');
  const [vote] = useVoteMutation();

  // const handlerVote = async (
  //   _value: number,
  //   _pId: number,
  //   _loading: LoadingType,
  //   _loadingUpOrDown: LoadingType,
  //   vs: number
  // ): Promise<MouseEvent | SVGElement | void> => {
  //   setLoading(_loadingUpOrDown);
  //   if (post.voteStatus === vs) {
  //     console.log('updoot', post.voteStatus);
  //     return;
  //   }
  //   await vote({ variables: { postId: _pId, value: _value } });
  //   setLoading(_loading);
  // };
  // console.log(post);
  const apolloClient = useApolloClient();

  const updateAfterVote = (
    value: number,
    postId: number,
    cache: ApolloCache<VoteMutation>
  ) => {
    const data = cache.readFragment<{
      id: number;
      points: number;
      voteStatus: number | null;
    }>({
      id: 'Post:' + postId,
      fragment: gql`
        fragment _ on Post {
          id
          points
          voteStatus
        }
      `,
    });

    if (data) {
      if (data.voteStatus === value) {
        return;
      }
      const newPoints =
        (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
      cache.writeFragment({
        id: 'Post:' + postId,
        fragment: gql`
          fragment __ on Post {
            points
            voteStatus
          }
        `,
        data: { points: newPoints, voteStatus: value },
      });
    }
  };

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" mr={4}>
      <IconButton
        bg={post.voteStatus === 1 ? 'green' : undefined}
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }

          setLoading('upvote-loading');
          await vote({
            variables: {
              postId: post.id,
              value: 1,
            },
            update: (cache) => updateAfterVote(1, post.id, cache),
          });

          setLoading('no-loading');
        }}
        cursor="pointer"
        aria-label="up vote"
        as={ChevronUpIcon}
      />
      <Text>{post.points}</Text>
      <IconButton
        aria-label="down vote"
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoading('downvote-loading');
          await vote({
            variables: {
              postId: post.id,
              value: -1,
            },
            update: (cache) => updateAfterVote(-1, post.id, cache),
          });
          setLoading('no-loading');
        }}
        bg={post.voteStatus === -1 ? 'red' : undefined}
        cursor="pointer"
        variant="outline"
        as={ChevronDownIcon}
      />
    </Flex>
  );
};

export default withApollo({ ssr: false })(Updoot);
