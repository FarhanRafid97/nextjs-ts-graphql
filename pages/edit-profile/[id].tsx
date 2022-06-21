import { Box, Button, Flex, Input, Link, Select } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import React from 'react';
import InputField from '../../components/InputField';
import Layout from '../../components/Layout';
import SelectInput from '../../components/SelectInput';
import {
  useMyBioQuery,
  useUpdateProfileMutation,
} from '../../src/generated/graphql';
import withApollo from '../../utils/withApollo';
import { useRouter } from 'next/router';
import { useIsAuth } from '../../utils/useIsAuth';

interface EditProfileProps {}

// type InputProfile = {
//   address: !String;
//   phoneNumber: !String;
//   gender: !String;
// };

const EditProfile: React.FC<EditProfileProps> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const { data } = useMyBioQuery();
  const [updateProfile] = useUpdateProfileMutation();
  console.log(data);

  console.log(data);
  return (
    <Layout>
      <Formik
        initialValues={{
          address: data?.myBio?.profile.address,
          phoneNumber: data?.myBio?.profile.phoneNumber,
          gender: data?.myBio?.profile.gender,
        }}
        onSubmit={async (values) => {
          updateProfile;
          const { errors } = await updateProfile({
            variables: {
              input: {
                address: values.address as string,
                phoneNumber: values.phoneNumber as string,
                gender: values.gender as string,
              },
            },
            update: (cache) => {
              console.log(cache);
              return cache.evict({ fieldName: 'myBio:{}' });
            },
          });
          if (!errors) {
            router.back();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="address" label="Address" placeholder="Address" />
            <Box mt={5}>
              <InputField name="phoneNumber" label="Phone Numeber" />
            </Box>

            <Box mt={5}>
              <SelectInput
                name="gender"
                label="Gender"
                optionVal={['Male', 'female']}
              />
            </Box>
            <Flex mt={5} rowGap="15px" flexDirection="column">
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

export default withApollo({ ssr: false })(EditProfile);
