import type { NextPage } from 'next';

import { withUrqlClient } from 'next-urql';
import Navbar from '../components/Navbar';
import { usePostQuery } from '../src/generated/graphql';

import { createUrqlClient } from '../utils/createUrqlClient';
import { Text, Container } from '@chakra-ui/react';
const Home: NextPage = () => {
  const [{ data }] = usePostQuery();
  return (
    <>
      <Navbar />
      <Container> TEST</Container>
      {!data ? (
        <Text>Loading</Text>
      ) : (
        data.posts.map((data) => <Text key={data.id}>{data.email}</Text>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
