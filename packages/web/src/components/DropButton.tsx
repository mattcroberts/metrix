import { Box, Button } from 'rebass/styled-components';
import { Link } from './Link';
import React from 'react';

export const DropButton = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        sx={{
          px: 2,
          py: 1,
          mr: 4,
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
