import { merge } from 'lodash';

export const theme = merge(require('@rebass/preset').default, {
  colors: {
    background: '#383d3f',
    gray: '#dddddf',
    highlight: 'red',
    muted: '#f6f6f9',
    primary: '#3c91e6',
    secondary: '#5941a9',
    text: '#e5d4ed',
  },
});
