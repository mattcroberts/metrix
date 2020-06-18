import styled from 'styled-components';
import React from 'react';
import { Text } from 'rebass/styled-components';

const Anchor = styled.a`
  display: inline-block;
  background: white;
  color: #444;
  width: 190px;
  border-radius: 5px;
  border: thin solid #888;
  box-shadow: 1px 1px 1px grey;
  white-space: nowrap;
  text-decoration: none;
  padding: 0 8px 0 4px;
`;

const Icon = styled.span`
  background: url('https://cdn.worldvectorlogo.com/logos/google-icon.svg') no-repeat;
  background-size: 29px;
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 8px;
  vertical-align: middle;
`;

export const GoogleButton: React.FC<{
  href: string;
}> = ({ href }) => (
  <Anchor href={href}>
    <Icon />
    <Text sx={{ verticalAlign: 'middle', display: 'inline', fontFamily: 'body' }}>Sign in with Google</Text>
  </Anchor>
);
