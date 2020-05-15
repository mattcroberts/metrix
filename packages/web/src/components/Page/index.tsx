import React, { FC } from 'react';
import { Flex, FlexProps } from 'rebass/styled-components';

export const Page: FC<FlexProps> = (props) => {
  return (
    <Flex
      sx={{
        backgroundColor: 'background',
        padding: [3, 4, 4],
        paddingTop: [2, 3, 4],
        flexDirection: 'column',
        boxShadow: `3px 3px 3px rgba(0,0,0, 0.5)`,
      }}
      {...props}
    />
  );
};
