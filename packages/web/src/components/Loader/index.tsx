import React, { FC } from 'react';
import ReactLoading from 'react-loading';
import { Flex } from 'rebass/styled-components';

export const Loader: FC = () => {
  return (
    <Flex sx={{ alignSelf: 'center', mt: 4 }}>
      <ReactLoading type="bars" />
    </Flex>
  );
};
