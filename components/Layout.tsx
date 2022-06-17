import React from 'react';
import Navbar from './Navbar';
import Wrapper, { VariantType } from './Wrapper';

interface LayoutProps {
  variant?: VariantType;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <Navbar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
