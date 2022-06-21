import { ApolloCache, useApolloClient } from '@apollo/client';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Text, useToast } from '@chakra-ui/react';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import {
  PostsSnippetFragment,
  useMyBioQuery,
  useVoteMutation,
  VoteMutation,
} from '../src/generated/graphql';
import withApollo from '../utils/withApollo';

interface UpdootProps {
  post: PostsSnippetFragment;
}
type LoadingType = 'upvote-loading' | 'downvote-loading' | 'no-loading';

const Updoot: React.FC<UpdootProps> = ({ post }) => {
  const toast = useToast();

  const [loading, setLoading] = useState<LoadingType>('no-loading');
  const [vote] = useVoteMutation();
  const { data } = useMyBioQuery();

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
          if (!data?.myBio) {
            toast({
              title: `Login FIrst`,
              status: 'error',
              position: 'top',
              isClosable: true,
            });
            return;
          }
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
          if (!data?.myBio) {
            toast({
              title: `Login FIrst`,
              status: 'error',
              position: 'top',
              isClosable: true,
            });
            return;
          }
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
