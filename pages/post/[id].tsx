import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import { usePostQuery } from '../../src/generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { Box, Flex, Link, Text, Button, Heading } from '@chakra-ui/react';

interface DetailPostProps {}

const DetailPost: React.FC<DetailPostProps> = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (!data?.post) {
    return (
      <Layout variant="ragular">
        <Box>There no post</Box>
      </Layout>
    );
  }
  return (
    <Layout variant="ragular">
      <Box>
        <Heading fontSize="xl">{data.post.title}</Heading>
        <Text color="red">creator: {data.post.creator.username}</Text>
        <Text mt={4}>{data.post.text}</Text>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(DetailPost);
