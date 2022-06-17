import type { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import Navbar from '../components/Navbar';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Text, Container } from '@chakra-ui/react';
import { usePostsQuery } from '../src/generated/graphql';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  const [{ data }] = usePostsQuery();
  console.log(data);
  return (
    <>
      <Layout>
        <Container> TEST</Container>
        {!data ? (
          <Text>Loading</Text>
        ) : (
          data.posts.map((data) => <Text key={data.id}>{data.title}</Text>)
        )}
      </Layout>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
