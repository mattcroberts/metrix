import * as React from 'react';
import { Box, Flex } from 'rebass/styled-components';
import { GoogleButton } from './GoogleButton';

export const LoginPage = () => {
  return (
    <Flex sx={{ alignItems: 'center', justifyContent: 'center', height: '10vh' }}>
      <Box>
        <GoogleButton href={`${process.env.REACT_APP_API_PATH}/auth/google`}>Google</GoogleButton>
      </Box>
    </Flex>
  );
};
