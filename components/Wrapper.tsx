import React from 'react';
import { Box } from '@chakra-ui/react';

interface WrapperProps {
  variant?: 'ragular' | 'small';
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant }) => {
  return (
    <Box maxW={variant ? '800px' : '600px'} w="100%" mt={10} mx="auto" p="15px">
      {children}
    </Box>
  );
};

export default Wrapper;
