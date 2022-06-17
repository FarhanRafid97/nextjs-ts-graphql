import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { useLoginMutation } from '../src/generated/graphql';
import { errorHandler } from '../utils/errorHandler';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';
import Layout from '../components/Layout';
interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  console.log(typeof router.query.next === 'string');
  const [, register] = useLoginMutation();
  return (
    <Wrapper>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.data?.loginUser.error) {
            setErrors(errorHandler(response.data.loginUser.error));
          } else if (response.data?.loginUser.user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next);
            } else {
              router.push('/');
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="usernameOrEmail" label="username or email" />
            <Box mt={5}>
              <InputField name="password" label="Password" type="password" />
            </Box>
            <Flex alignItems="center" mt={5} columnGap="15px">
              <Button
                type="submit"
                colorScheme="yellow"
                isLoading={isSubmitting}
              >
                Login
              </Button>
              <NextLink href="/forget-password">
                <Link color="blue.500">Forget Password?</Link>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
