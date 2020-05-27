import React, { FC } from 'react';
import { NotificationConfig } from './notification-config';
import { Page } from '../../components/Page';
import { Heading } from 'rebass/styled-components';

export const SettingsPage: FC = () => {
  return (
    <Page>
      <Heading>Settings</Heading>
      <NotificationConfig />
    </Page>
  );
};
