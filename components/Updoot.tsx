import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  PostsSnippetFragment,
  useVoteMutation,
} from '../src/generated/graphql';

interface UpdootProps {
  post: PostsSnippetFragment;
}
type LoadingType = 'upvote-loading' | 'downvote-loading' | 'no-loading';

const Updoot: React.FC<UpdootProps> = ({ post }) => {
  const [loading, setLoading] = useState<LoadingType>('no-loading');
  const [, vote] = useVoteMutation();
  const handlerVote = async (
    _value: number,
    _pId: number,
    _loading: LoadingType,
    _loadingUpOrDown: LoadingType,
    vs: number
  ): Promise<MouseEvent | SVGElement | void> => {
    setLoading(_loadingUpOrDown);
    if (post.voteStatus === vs) {
      console.log('updoot', post.voteStatus);
      return;
    }
    await vote({ postId: _pId, value: _value });
    setLoading(_loading);
  };
  console.log(post);

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
            postId: post.id,
            value: 1,
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
            postId: post.id,
            value: -1,
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

export default Updoot;
