import { Button, Flex, Link, Text } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';

import React, { useState } from 'react';
import InputField from '../../components/InputField';
import Wrapper from '../../components/Wrapper';
import {
  MyBioDocument,
  MyBioQuery,
  useChangePasswordMutation,
} from '../../src/generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { errorHandler } from '../../utils/errorHandler';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import withApollo from '../../utils/withApollo';

const ChangePassword: NextPage<{}> = () => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();

  const [tokenError, setTokenError] = useState('');
  return (
    <Wrapper>
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            variables: {
              newPassword: values.newPassword,
              token:
                typeof router.query.token === 'string'
                  ? router.query.token
                  : '',
            },
            update: (cache, { data }) => {
              cache.writeQuery<MyBioQuery>({
                query: MyBioDocument,
                data: {
                  __typename: 'Query',
                  myBio: data?.changePassword.user,
                },
              });
              cache.evict({ fieldName: 'posts:{}' });
            },
          });
          if (response.data?.changePassword.error) {
            const errorMap = errorHandler(response.data.changePassword.error);
            if ('token' in errorMap) {
              setTokenError(errorMap.token);
            }
            console.log(errorMap);
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              label="New Password"
              placeholder="New Password"
              type="password"
            />
            {tokenError && (
              <Flex columnGap="5px">
                <Text color="red">{tokenError}</Text>
                <NextLink href="/forget-password">
                  <Link color="blue.500">Get a New One</Link>
                </NextLink>
              </Flex>
            )}
            <Button
              type="submit"
              colorScheme="yellow"
              mt={5}
              isLoading={isSubmitting}
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(ChangePassword);
