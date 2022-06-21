import { Box, Heading, Text } from '@chakra-ui/react';
<<<<<<< HEAD
import { withUrqlClient } from 'next-urql';
=======
>>>>>>> apollo-server
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import { usePostQuery } from '../../src/generated/graphql';
<<<<<<< HEAD
import { createUrqlClient } from '../../utils/createUrqlClient';
=======
import withApollo from '../../utils/withApollo';
>>>>>>> apollo-server

interface DetailPostProps {}

const DetailPost: React.FC<DetailPostProps> = ({}) => {
  const router = useRouter();
  const intId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;
  const { data, loading } = usePostQuery({
    skip: intId === -1,
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

export default withApollo({ ssr: true })(DetailPost);
