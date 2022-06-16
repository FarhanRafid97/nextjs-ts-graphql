import { Box, Flex, Link, Text, Button } from '@chakra-ui/react';
import React from 'react';
import { useMyBioQuery } from '../src/generated/graphql';
import NextLink from 'next/link';
interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data, fetching }] = useMyBioQuery();

  let body;
  if (fetching) {
  } else if (!data?.myBio) {
    body = (
      <>
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
        <Text>{data?.myBio?.username}</Text>
        <Button>Logout</Button>
      </>
    );
  }
  console.log(body);
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
