import { Textarea } from '@rebass/forms';
import { Label } from '@rebass/forms/styled-components';
import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Text } from 'rebass/styled-components';
import { Field } from '../../../components/Field';
import { app } from '../../../firebase-config';
import { useGetNotifcationConfigQuery, useUnregisterDeviceMutation } from '../../../generated/graphql';
import { registerDevice } from '../../../registerDevice';
import { Loader } from '../../../components/Loader';
import { Check, X } from 'react-feather';
const messaging = app.messaging();

export const NotificationConfig: FC = () => {
  const { data, loading, refetch } = useGetNotifcationConfigQuery();
  const [currentToken, setCurrentToken] = useState('');
  const currentDevice = data?.devices.find((device) => device.token === currentToken);

  const [unregisterDevice] = useUnregisterDeviceMutation();

  useEffect(() => {
    messaging.getToken().then((token) => {
      setCurrentToken(token);
    });
  }, []);

  if (!data || loading) {
    return (
      <Flex justifyContent="center">
        <Loader />
      </Flex>
    );
  }

  return (
    <Flex sx={{ flexDirection: 'column', border: '1px solid', borderColor: 'muted', p: [2, 4], pt: [2, 3], mt: '3' }}>
      <Heading as="h3" fontSize="3">
        Device Configuration
      </Heading>
      {currentDevice && (
        <Flex
          as="span"
          sx={{ fontFamily: 'body', fontWeight: 'bold', justifyContent: 'center', alignItems: 'center', mt: 2 }}
        >
          Device Registered <Check color="green" style={{ marginLeft: '4px' }} />
        </Flex>
      )}
      <Field>
        <Label>Current device token:</Label>
        <Textarea value={currentToken} readOnly />
      </Field>

      {currentDevice && (
        <Flex sx={{ mt: 2, justifyContent: 'center' }}>
          <Button
            onClick={async () => {
              await unregisterDevice({ variables: { id: currentDevice.id } });
              await refetch();
            }}
          >
            Unregister this device
          </Button>
        </Flex>
      )}
      {!currentDevice && (
        <Flex sx={{ mt: 2, justifyContent: 'center' }}>
          <Button
            onClick={async () => {
              await registerDevice();
              await refetch();
            }}
          >
            Register this device
          </Button>
        </Flex>
      )}

      <Heading as="h4" fontSize="2" mt="4">
        All My Tokens
      </Heading>
      <Box as="ul" sx={{ listStyle: 'none', padding: 0, wordWrap: 'break-word', fontFamily: 'body', mt: 2 }}>
        {data?.devices.map((device) => (
          <Flex as="li" key={device.id} sx={{ alignItems: 'center', mt: 2 }}>
            <Textarea value={device.token} readOnly mr="2" />
            <X
              color="red"
              onClick={async () => {
                await unregisterDevice({ variables: { id: device.id } });
                await refetch();
              }}
            />
          </Flex>
        ))}
      </Box>
    </Flex>
  );
};
