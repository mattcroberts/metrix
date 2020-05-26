import React, { FC, useState } from 'react';
import { Box, Text, Flex } from 'rebass/styled-components';
import { createPortal } from 'react-dom';

export const Drawer: FC<{ open: boolean; setOpen: (toggle: boolean) => any }> = ({ children, open, setOpen }) => {
  return createPortal(
    <Flex
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        backgroundColor: 'muted',
        width: open ? '50%' : '0%',
        color: 'background',
        overflow: 'hidden',
        transition: 'width 0.5s',
      }}
    >
      <Flex sx={{ padding: 4, flexDirection: 'column', width: '50vw', position: 'absolute' }}>
        <Text sx={{ ml: 'auto' }}>
          <a href="#" onClick={() => setOpen(false)}>
            Close
          </a>
        </Text>
        <Box>{children}</Box>
      </Flex>
    </Flex>,
    document.getElementById('drawer-root')!
  );
};
