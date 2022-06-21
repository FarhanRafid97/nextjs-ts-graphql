import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../../../components/InputField';
import Layout from '../../../components/Layout';
import { useUpdatePostMutation } from '../../../src/generated/graphql';
import { useGetIdInt } from '../../../utils/useGetIdint';
import { useGetPostUrlForm } from '../../../utils/useGetPostUrlForm';
import withApollo from '../../../utils/withApollo';

interface UpdatePostProps {}

const UpdatePost: React.FC<UpdatePostProps> = ({}) => {
  const router = useRouter();
  const intId = useGetIdInt();
  const { data } = useGetPostUrlForm();
  const [updatePost] = useUpdatePostMutation();

  if (!data?.post) {
    return (
      <Layout>
        <Text>No Post With That Id</Text>
      </Layout>
    );
  }
  return (
    <Layout>
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          await updatePost({ variables: { id: intId, ...values } });
          //   router.push('/');
          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" label="Title" />
            <Box mt={5}>
              <InputField textarea name="text" label="Text" />
            </Box>
            <Flex alignItems="center" mt={5} columnGap="15px">
              <Button
                type="submit"
                colorScheme="yellow"
                isLoading={isSubmitting}
              >
                Update Post
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(UpdatePost);
