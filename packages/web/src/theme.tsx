import { merge } from 'lodash';

export const theme = merge(require('@rebass/preset').default, {
  breakpoints: ['40em', '52em', '64em'],
  colors: {
    pageBackground: '#525759',
    background: '#383d3f',
    gray: '#dddddf',
    highlight: 'red',
    muted: '#f6f6f9',
    primary: '#3c91e6',
    secondary: '#5941a9',
    text: '#e5d4ed',
  },
  buttons: {
    primary: {
      boxShadow: `3px 3px 3px rgba(0,0,0, 0.25)`,
      fontFamily: 'body',
    },
  },
  fonts: {
    heading: 'Open Sans',
    body: 'Open Sans',
  },
  forms: {
    label: {
      fontFamily: 'heading',
    },
  },

  variants: {
    link: {
      fontFamily: 'body',
    },
    dropButton: {
      fontFamily: 'body',
      color: 'background',
      fontWeight: 'bold',
      textDecoration: 'none',
      width: '100%',
      p: [2, 3, 3],
      py: 2,
      display: 'inline-block',
      '&:hover': { backgroundColor: 'secondary', color: 'text' },
    },
  },
});
console.log({ theme });
