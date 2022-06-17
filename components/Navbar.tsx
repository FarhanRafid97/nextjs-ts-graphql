import { Box, Flex, Link, Text, Button } from '@chakra-ui/react';
import React from 'react';
import { useLogoutMutation, useMyBioQuery } from '../src/generated/graphql';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { isServer } from '../utils/isServer';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();

  const [{ fetching: logoutFetch }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMyBioQuery({
    pause: isServer(),
  });

  const logoutHandler = () => {
    logout();
    router.push('/login');
  };

  let body;
  if (isServer() || fetching) {
  } else if (!data?.myBio) {
    body = (
      <>
        <NextLink href="/create-post">
          <Link>Create Post</Link>
        </NextLink>
        <NextLink href="/login">
          <Link>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <Flex columnGap="15px" alignItems="center">
          <NextLink href="/create-post">
            <Link>Create Post</Link>
          </NextLink>
          <Box mr={2}>{data.myBio.username}</Box>
          <Button
            onClick={logoutHandler}
            variant="solid"
            colorScheme="linkedin"
            isLoading={logoutFetch}
          >
            logout
          </Button>
        </Flex>
      </>
    );
  }

  return (
    <Flex w="100%" justifyContent="space-between" p={5}>
      <Box>
        <Text>Logo</Text>
      </Box>
      <Flex columnGap="15px" alignItems="center">
        {body}
      </Flex>
    </Flex>
  );
};

export default Navbar;
