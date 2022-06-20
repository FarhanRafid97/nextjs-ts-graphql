import React from 'react';
import { Box } from '@chakra-ui/react';

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
    >
      {children}
    </Box>
  );
};

export default Wrapper;
