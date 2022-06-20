import { Box, Button, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useLogoutMutation, useMyBioQuery } from '../src/generated/graphql';
import { isServer } from '../utils/isServer';
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
            colorScheme="messenger"
            isLoading={logoutFetch}
          >
            logout
          </Button>
        </Flex>
      </>
    );
  }

  return (
    <Flex
      w="100%"
      p={5}
      position="fixed"
      top="0"
      color="gray.100"
      bg="blue.400"
      zIndex="99"
    >
      <Flex w={800} justifyContent="space-between" m="auto">
        <Box>
          <NextLink href="/">
            <Link fontSize="18px">Home</Link>
          </NextLink>
        </Box>
        <Flex columnGap="15px" alignItems="center">
          {body}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
