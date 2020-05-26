import React, { useEffect, useState, FC } from 'react';
import { useGetNotifcationConfigQuery, useGetNotifcationConfigLazyQuery } from '../../generated/graphql';
import { Box, Text, Button, Flex } from 'rebass/styled-components';
import { registerDevice } from '../../registerDevice';
import { app } from '../../firebase-config';
import styled from 'styled-components';

const messaging = app.messaging();

const UL = styled.ul`
  list-style: none;
  padding: 0;
  word-wrap: break-word;
  font-family: ${({ theme }) => theme.fonts.body};
`;

export const NotificationConfig: FC<{ visible: boolean }> = ({ visible }) => {
  const [execQuery, { data, loading, called }] = useGetNotifcationConfigLazyQuery();
  const [currentToken, setCurrentToken] = useState('');
  const isCurrentDeviceRegistered = data?.devices.find((device) => device.token === currentToken);

  useEffect(() => {
    messaging.getToken().then((token) => {
      setCurrentToken(token);
    });
  }, []);

  if (visible && !called) {
    execQuery();
  }

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Text as="span" sx={{ fontFamily: 'body' }}>
        Current device token:
      </Text>
      <Text as="span" sx={{ fontFamily: 'body', wordWrap: 'break-word' }}>
        {currentToken}
      </Text>
      {!isCurrentDeviceRegistered && (
        <Button
          onClick={async () => {
            await registerDevice();
          }}
        >
          Register this device
        </Button>
      )}
      <UL>
        {data?.devices.map((device) => (
          <li key={device.id}>
            <Text>{device.token}</Text>
          </li>
        ))}
      </UL>
    </Flex>
  );
};
