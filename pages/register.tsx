import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import Wrapper from '../components/Wrapper';
import {
  MyBioDocument,
  MyBioQuery,
  useRegisterMutation,
} from '../src/generated/graphql';
import { errorHandler } from '../utils/errorHandler';
import withApollo from '../utils/withApollo';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  return (
    <Layout>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { option: values },
            update: (cache, { data }) => {
              cache.writeQuery<MyBioQuery>({
                query: MyBioDocument,
                data: {
                  __typename: 'Query',
                  myBio: data?.createUser?.user,
                },
              });
              cache.evict({ fieldName: 'posts:{}' });
            },
          });
          console.log(response);
          if (response.data?.createUser?.error) {
            setErrors(errorHandler(response.data.createUser.error));
          } else if (response.data?.createUser?.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" label="Username" />
            <Box mt={5}>
              <InputField name="email" label="Email" type="email" />
            </Box>
            <Box mt={5}>
              <InputField name="password" label="Password" type="password" />
            </Box>
            <Button
              type="submit"
              colorScheme="yellow"
              mt={5}
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Register);
