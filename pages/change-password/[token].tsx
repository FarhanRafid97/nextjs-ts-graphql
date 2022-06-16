import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import router from 'next/router';
import React, { useState } from 'react';
import InputField from '../../components/InputField';
import Wrapper from '../../components/Wrapper';
import { useChangePasswordMutation } from '../../src/generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { errorHandler } from '../../utils/errorHandler';
import register from '../register';

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [, changePassword] = useChangePasswordMutation();

  const [tokenError, setTokenError] = useState('');
  return (
    <Wrapper>
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token,
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
            {tokenError && <Box>{tokenError}</Box>}
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

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};
export default withUrqlClient(createUrqlClient)(ChangePassword);
