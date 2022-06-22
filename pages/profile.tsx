import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Text,
  WrapItem,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useMyBioQuery } from '../src/generated/graphql';
import withApollo from '../utils/withApollo';
import { isServer } from '../utils/isServer';
import { useRouter } from 'next/router';
import { useIsAuth } from '../utils/useIsAuth';
import { useQuery } from 'urql';
import { EditIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const router = useRouter();
  ``;
  useIsAuth();
  const { data, loading } = useMyBioQuery();

  return (
    <Layout>
      <Flex
        direction="column"
        rowGap="15px"
        alignItems="center"
        boxShadow="lg"
        p="15px"
      >
        <Heading display="flex" mx="auto">
          Your profile
        </Heading>
        <WrapItem>
          <Flex direction="column" alignItems="center" rowGap="15px">
            <Avatar
              size="2xl"
              name="Segun Adebayo"
              src="https://bit.ly/sage-adebayo"
            />
            <NextLink
              href="/edit-profile/[id]"
              as={`/edit-profile/${data?.myBio?.id}`}
            >
              <Link>
                <IconButton
                  width="50px"
                  icon={<EditIcon />}
                  aria-label="button"
                />
              </Link>
            </NextLink>
          </Flex>
        </WrapItem>
        <Flex direction="column" alignItems="center" fontSize="18px">
          <Flex columnGap="5px">
            <Text size="lg">Name : </Text> <Text> {data?.myBio?.username}</Text>
          </Flex>
          <Flex columnGap="5px">
            <Text size="lg">Alamat : </Text>{' '}
            <Text>{data?.myBio?.profile.address}</Text>
          </Flex>
          <Flex columnGap="5px">
            <Text size="lg">Phone Number : </Text>
            <Text>{data?.myBio?.profile.phoneNumber}</Text>
          </Flex>
          <Flex columnGap="5px">
            <Text size="lg">Gender : </Text>{' '}
            <Text>{data?.myBio?.profile.gender}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Profile);
