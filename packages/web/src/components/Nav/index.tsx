import * as React from 'react';
import { Box, Button, Flex, Heading } from 'rebass/styled-components';
import { Link } from '../Link';

const NavElement = ({ to, text }: { to: string; text: string }) => (
  <Flex sx={{ px: [2, 3, 3], alignItems: 'center', minWidth: 'auto', '&:hover': { backgroundColor: 'primary' } }}>
    <Link
      to={to}
      sx={{
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
  </Flex>
);

const DropButton = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        sx={{
          px: 2,
          py: 1,
          whiteSpace: 'nowrap',
          outline: 'none',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'secondary',
          boxShadow: `3px 3px 3px rgba(0,0,0, 0.5)`,
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
              <Link variant="dropButton" to="/metrics/new">
                Metric
              </Link>
            </Box>{' '}
            <Box as="li">
              <Link variant="dropButton" to="/analyses/new">
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
    <Flex sx={{ width: '100%', justifyContent: 'flex-end', marginRight: 4, alignItems: 'center' }}>
      <DropButton />
    </Flex>
  </Flex>
);
