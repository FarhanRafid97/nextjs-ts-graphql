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
} from '@chakra-ui/react';
import { usePostsQuery } from '../src/generated/graphql';
import Layout from '../components/Layout';
import React, { useState } from 'react';
import NextLink from 'next/link';

const Home: NextPage = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }

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
            {data!.posts.map((data) => (
              // <Text key={data.id}>{data.title}</Text>

              <Box key={data.id} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{data.title}</Heading>
                <Text mt={4}>{data.text.slice(0, 50)}...</Text>
              </Box>
            ))}
          </Stack>
        )}
        {data ? (
          <Flex>
            <Button
              onClick={() => {
                setVariables({
                  limit: variables.limit,
                  cursor: data.posts[data.posts.length - 1].createdAt,
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
