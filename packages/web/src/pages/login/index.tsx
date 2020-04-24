import * as React from 'react';
import { Box, Flex } from 'rebass/styled-components';
import { GoogleButton } from './GoogleButton';

export const LoginPage = () => {
  return (
    <Flex sx={{ alignItems: 'center', justifyContent: 'center', height: '10vh' }}>
      <Box>
        <GoogleButton href="http://localhost:4000/auth/google">Google</GoogleButton>
      </Box>
    </Flex>
  );
};
