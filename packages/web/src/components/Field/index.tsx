import React, { FC } from 'react';
import { Box, BoxProps } from 'rebass/styled-components';

export const Field: FC<BoxProps> = ({ children, ...props }) => (
  <Box sx={{ width: '100%', mt: [3, 4], mr: [2, 4], '&:last-child': { mr: 0 }, flexDirection: 'column' }} {...props}>
    {children}
  </Box>
);
