import React, { FC } from 'react';
import { Box } from 'rebass/styled-components';

export const Field: FC = ({ children }) => (
  <Box sx={{ margin: 4, ml: 0, flexDirection: 'column', width: '40%' }}>{children}</Box>
);
