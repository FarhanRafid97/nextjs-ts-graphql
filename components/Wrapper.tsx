import { Box } from '@chakra-ui/react';
import React from 'react';

export type VariantType = 'ragular' | 'small';
interface WrapperProps {
  variant?: VariantType;
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant }) => {
  return (
    <Box
      maxW={variant ? '800px' : '600px'}
      w="100%"
      mt="80px"
      mx="auto"
      p="15px"
      paddingTop="35px"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
