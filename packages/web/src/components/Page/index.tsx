import React, { FC } from 'react';
import { FlexProps, Flex } from 'rebass/styled-components';

export const Page: FC<FlexProps> = (props) => {
  return <Flex sx={{ backgroundColor: 'background', padding: 4, flexDirection: 'column' }} {...props} />;
};
