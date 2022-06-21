import { Box, Button, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { useForgetPasswordMutation } from '../src/generated/graphql';
import { errorHandler } from '../utils/errorHandler';
import withApollo from '../utils/withApollo';

interface ForgetPasswordProps {}

const ForgetPassword: React.FC<ForgetPasswordProps> = ({}) => {
  const [forgetPassword] = useForgetPasswordMutation();
  const [linkForget, setLinkForget] = useState<string | null | undefined>('');
  console.log(linkForget);
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await forgetPassword({
            variables: { email: values.email },
          });
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

export default withApollo({ ssr: false })(ForgetPassword);
