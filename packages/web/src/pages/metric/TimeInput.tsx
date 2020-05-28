import TimePolyfill from 'react-time-input-polyfill';
import styled from 'styled-components';

export const TimeInput = styled(TimePolyfill)`
  display: block;
  width: 100%;
  padding: 8px;
  appearance: none;
  font-size: ${({ theme }) => `${theme.fontSizes[1]}px`};
  font-family: ${({ theme }) => theme.fonts.body};
  line-height: 16px; //hack
  border: 1px solid;
  border-radius: ${({ theme }) => `${theme.radii.default}px`};
  color: inherit;
  background: transparent;
  box-sizing: border-box;

  &::-webkit-inner-spin-button {
    display: none;
  }

  &::-webkit-clear-button {
    display: none;
  }
`;
