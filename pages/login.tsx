import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import {
  MyBioDocument,
  MyBioQuery,
  useLoginMutation,
} from '../src/generated/graphql';
import { errorHandler } from '../utils/errorHandler';
import withApollo from '../utils/withApollo';
interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
  const router = useRouter();

  const [login] = useLoginMutation();
  return (
    <Layout>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: values,
            update: (cache, { data }) => {
              cache.writeQuery<MyBioQuery>({
                query: MyBioDocument,
                data: {
                  __typename: 'Query',
                  myBio: data?.loginUser.user,
                },
              });

              cache.evict({ fieldName: 'posts:{}' });
            },
          });
          console.log(response);
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
    </Layout>
  );
};

export default withApollo({ ssr: false })(Login);
