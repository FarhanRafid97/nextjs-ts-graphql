import type { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import Navbar from '../components/Navbar';
import { createUrqlClient } from '../utils/createUrqlClient';
import {
  Text,
  Stack,
  Box,
  Heading,
  Flex,
  Link,
  Button,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import {
  useDeletePostMutation,
  useMyBioQuery,
  usePostsQuery,
} from '../src/generated/graphql';
import Layout from '../components/Layout';
import React, { useState } from 'react';
import NextLink from 'next/link';
import Updoot from '../components/Updoot';
import { DeleteIcon } from '@chakra-ui/icons';

import { isServer } from '../utils/isServer';
const Home: NextPage = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data: biodata }] = useMyBioQuery({
    pause: isServer(),
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  console.log(biodata);
  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }
  const [, deletePost] = useDeletePostMutation();

  return (
    <>
      <Layout variant="ragular">
        <Flex mb={5} alignItems="center" justifyContent="space-between">
          <Heading>Liredit</Heading>
          <NextLink href="/create-post">
            <Link>Create Post</Link>
          </NextLink>
        </Flex>
        {!data && fetching ? (
          <Text>Loading</Text>
        ) : (
          <Stack spacing={8}>
            {data!.posts.posts.map((data) =>
              !data ? null : (
                // <Text key={data.id}>{data.title}</Text>

                <Flex
                  key={data.id}
                  p={5}
                  shadow="md"
                  borderWidth="1px"
                  alignItems="center"
                >
                  <Updoot post={data} />
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    w="100%"
                  >
                    <Box>
                      <NextLink href="/post/[id]" as={`/post/${data.id}`}>
                        <Link>
                          <Heading fontSize="xl">{data.title}</Heading>
                        </Link>
                      </NextLink>
                      <Flex mt={2}>
                        Posted by{' '}
                        <Text ml={2} color="blue.400">
                          {data.creator.username}
                        </Text>
                      </Flex>
                      <Text mt={4}>{data.text.slice(0, 50)}</Text>
                    </Box>
                    {biodata?.myBio?.id === data.creator.id && (
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        aria-label="button"
                        onClick={() => deletePost({ id: data.id })}
                      >
                        Test
                      </IconButton>
                    )}
                  </Flex>
                </Flex>
              )
            )}
          </Stack>
        )}
        {data && data.posts.isMorePost ? (
          <Flex>
            <Button
              onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                });
              }}
              isLoading={fetching}
              m="auto"
              my={8}
            >
              load more
            </Button>
          </Flex>
        ) : null}
      </Layout>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
