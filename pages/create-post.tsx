import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Link,
  Text,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import { useCreatePostMutation } from '../src/generated/graphql';
import { useIsAuth } from '../utils/useIsAuth';
import withApollo from '../utils/withApollo';

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();

  useIsAuth();
  const [createPost] = useCreatePostMutation();
  const [message, setMessage] = useState('');
  const [succed, setSucced] = useState(false);
  return (
    <Layout>
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values) => {
          console.log(values);
          const { errors } = await createPost({
            variables: values,
            update: (cache) => cache.evict({ fieldName: 'posts:{}' }),
          });
          if (!errors) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {succed && (
              <Alert status="success" variant="subtle">
                <AlertIcon />
                Data uploaded to the server. Fire on!
              </Alert>
            )}
            <InputField name="title" label="Title" placeholder="title" />
            <Box mt={5}>
              <InputField textarea name="text" label="Text" />
            </Box>
            <Flex mt={5} rowGap="15px" flexDirection="column">
              {message && (
                <Text color="red">
                  {message}{' '}
                  <NextLink href="/login">
                    <Link color="blue.400"> Login</Link>
                  </NextLink>{' '}
                </Text>
              )}
              <Flex columnGap="15px">
                <Button
                  w="150px"
                  type="submit"
                  colorScheme="yellow"
                  isLoading={isSubmitting}
                >
                  Create Post
                </Button>
                <NextLink href="/">
                  <Link>
                    <Button>Back</Button>
                  </Link>
                </NextLink>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(CreatePost);
