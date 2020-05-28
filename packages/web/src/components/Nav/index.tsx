import * as React from 'react';
import { Settings } from 'react-feather';
import { useRouteMatch } from 'react-router-dom';
import { Flex, Heading } from 'rebass/styled-components';
import { DropButton } from '../DropButton';
import { Link } from '../Link';

const NavElement = ({ to, text }: { to: string; text: string }) => {
  const match = useRouteMatch(to);
  return (
    <Flex
      sx={{
        px: [2, 3, 3],
        alignItems: 'center',
        minWidth: 'auto',
      }}
    >
      <Link
        to={to}
        sx={{
          textDecoration: 'none',
          fontWeight: 'bold',
          color: 'text',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 2,
          borderBottomStyle: match?.isExact ? 'solid' : 'none',
        }}
      >
        {text}
      </Link>
    </Flex>
  );
};

export const Nav = () => {
  return (
    <Flex sx={{ backgroundColor: 'secondary', alignItems: 'stretch', boxShadow: `3px 3px 3px rgba(0,0,0, 0.5)` }}>
      <Heading
        sx={{
          pl: [3, 4, 4],
          pr: [1, 3, 3],
          fontSize: 3,
          fontWeight: 'bold',
          lineHeight: '54px',
          minWidth: 'auto',
        }}
      >
        Metrix
      </Heading>
      <NavElement to="/" text="Home" />
      <NavElement to="/analyses" text="Analyses" />
      <Flex sx={{ width: '100%', justifyContent: 'flex-end', marginRight: [3, 4], alignItems: 'center' }}>
        <DropButton />
        <Link to="/settings" sx={{ color: 'muted', pt: 2 }}>
          <Settings />
        </Link>
      </Flex>
    </Flex>
  );
};
