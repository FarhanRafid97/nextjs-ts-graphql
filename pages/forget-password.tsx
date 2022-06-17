import { Box, Flex, Link, Button } from '@chakra-ui/react';

import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';

import React, { useState } from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useForgetPasswordMutation } from '../src/generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { errorHandler } from '../utils/errorHandler';

interface ForgetPasswordProps {}

const ForgetPassword: React.FC<ForgetPasswordProps> = ({}) => {
  const [, forgetPassword] = useForgetPasswordMutation();
  const [linkForget, setLinkForget] = useState<string | null | undefined>('');
  console.log(linkForget);
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await forgetPassword({ email: values.email });
          if (response.data?.forgetPassword.error) {
            setErrors(errorHandler(response.data.forgetPassword.error));
          }
          setLinkForget(response.data?.forgetPassword.linkEmail);
        }}
      >
        {({ isSubmitting }) =>
          linkForget ? (
            <Link color="blue.400" href={linkForget} mt={2} target="_blank">
              Click Here To Change passsword
            </Link>
          ) : (
            <Form>
              <Box mt={5}>
                <InputField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Email"
                />
              </Box>

              <Button
                mt={5}
                width="170px"
                type="submit"
                colorScheme="yellow"
                isLoading={isSubmitting}
              >
                Forget Password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgetPassword);
