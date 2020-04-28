import * as React from 'react';
import { Box, Flex, Button } from 'rebass/styled-components';
import { Link } from '../Link';
import { relative } from 'path';

const NavElement = ({ to, text }: { to: string; text: string }) => (
  <Link
    to={to}
    sx={{
      p: 3,
      '&:hover': { backgroundColor: 'primary' },
      textDecoration: 'none',
      fontWeight: 'bold',
      color: 'text',

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {text}
  </Link>
);

const DropButton = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        sx={{
          outline: 'none',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'secondary',
        }}
        onClick={() => setOpen(!open)}
      >
        Create ▼
      </Button>
      {open && (
        <Box
          sx={{
            backgroundColor: 'primary',
            position: 'absolute',
            top: 4,
            width: '100%',
            borderBottomRightRadius: 4,
            borderBottomLeftRadius: 4,
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'secondary',
            borderTop: 'none',
          }}
        >
          <Box
            as="ul"
            sx={{
              listStyle: 'none',
              p: 0,
            }}
          >
            <Box as="li">
              <Link
                sx={{
                  color: 'background',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  width: '100%',
                  px: 3,
                  py: 2,
                  display: 'inline-block',
                  '&:hover': { backgroundColor: 'secondary', color: 'text' },
                }}
                to="/metrics/new"
              >
                Metric
              </Link>
            </Box>{' '}
            <Box as="li">
              <Link
                sx={{
                  color: 'background',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  width: '100%',
                  px: 3,
                  py: 2,
                  display: 'inline-block',
                  '&:hover': { backgroundColor: 'secondary', color: 'text' },
                }}
                to="/analyses/new"
              >
                Analysis
              </Link>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
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
    <NavElement to="/analyses" text="Analyses" />
    <Flex sx={{ width: '100%', justifyContent: 'flex-end', marginRight: 4 }}>
      <DropButton />
    </Flex>
  </Flex>
);
