import * as React from 'react';
import { Box, Flex } from 'rebass/styled-components';
import { Link } from '../Link';

const NavElement = ({ to, text }: { to: string; text: string }) => (
  <Link
    to={to}
    sx={{
      p: 3,
      '&:hover': { backgroundColor: 'primary' },
      textDecoration: 'none',
      color: 'text',
    }}
  >
    {text}
  </Link>
);

export const Nav = () => (
  <Flex sx={{ backgroundColor: 'secondary', alignItems: 'center' }}>
    <Box
      sx={{
        pl: 4,
        pr: 4,
        fontSize: 3,
        fontWeight: 'bold',
        lineHeight: '54px',
      }}
    >
      Metrix
    </Box>
    <NavElement to="/" text="Home" />
    <NavElement to="/metrics" text="Metrics" />
    <NavElement to="/analyses" text="Analyses" />
  </Flex>
);
