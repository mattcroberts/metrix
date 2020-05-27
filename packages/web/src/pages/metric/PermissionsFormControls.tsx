import { Checkbox } from '@rebass/forms';
import { Input, Label, Select } from '@rebass/forms/styled-components';
import React, { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, Flex } from 'rebass/styled-components';
import { Field } from '../../components/Field';
import { Option } from '../../components/Option';
import { Metric, ReminderUnit } from '../../generated/graphql';
import { registerDevice } from '../../registerDevice';

export const MetricPermissionsFormControls: FC<{
  metric?: Pick<Metric, 'reminder' | 'reminderValue' | 'reminderUnit'>;
}> = ({ metric = {} }) => {
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
  const { register, watch } = useFormContext();
  const reminder = watch('reminder', { reminder: metric.reminder });

  return (
    <>
      {(notificationPermission !== 'granted' && (
        <Flex mt="4">
          <Button
            onClick={async () => {
              let permission = Notification.permission;
              try {
                permission = await Notification.requestPermission();
                setNotificationPermission(permission);
              } catch (e) {
                console.error(e);
              }
              if (permission === 'granted') {
                await registerDevice();
              }
              return false;
            }}
            type="button"
          >
            Setup Reminders
          </Button>
        </Flex>
      )) || (
        <Flex>
          <Field>
            <Label sx={{ flexDirection: 'column' }}>
              Send reminder?
              <Checkbox name="reminder" ref={register} defaultChecked={metric.reminder} />
            </Label>
          </Field>
        </Flex>
      )}
      {notificationPermission === 'granted' && reminder && (
        <>
          <Flex sx={{ flexDirection: 'row' }}>
            <Field width={[1 / 3, 1 / 10]}>
              <Label>Every</Label>
              <Input type="number" name="reminderValue" ref={register} defaultValue={metric.reminderValue} />
            </Field>
            <Field width={[2 / 3, 1 / 4]}>
              <Label>&nbsp;</Label>
              <Select name="reminderUnit" ref={register} defaultValue={metric.reminderUnit}>
                <Option value={ReminderUnit.Day}>Days</Option>
                <Option value={ReminderUnit.Hour}>Hours</Option>
                <Option value={ReminderUnit.Minute}>Minutes</Option>
              </Select>
            </Field>
          </Flex>
        </>
      )}
    </>
  );
};
