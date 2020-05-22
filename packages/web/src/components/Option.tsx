import React, { FC } from 'react';
import { Box } from 'rebass/styled-components';

export const Option: FC<{
  value: string;
}> = (props) => <Box as="option" sx={{ backgroundColor: 'pageBackground', color: 'text' }} {...props}></Box>;
