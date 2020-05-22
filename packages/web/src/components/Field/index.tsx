import React, { FC } from 'react';
import { Box, BoxProps } from 'rebass/styled-components';

export const Field: FC<BoxProps> = ({ children, ...props }) => (
  <Box sx={{ margin: 4, ml: 0, flexDirection: 'column', width: '40%' }} {...props}>
    {children}
  </Box>
);
