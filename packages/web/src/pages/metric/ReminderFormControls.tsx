import { Checkbox } from '@rebass/forms';
import { Input, Label, Select } from '@rebass/forms/styled-components';
import React, { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, Flex, Text } from 'rebass/styled-components';
import { Field } from '../../components/Field';
import { Option } from '../../components/Option';
import { Metric, ReminderUnit } from '../../generated/graphql';
import { registerDevice } from '../../registerDevice';
import { TimeInput } from './TimeInput';

export const MetricReminderFormControls: FC<{
  metric?: Pick<Metric, 'reminder' | 'reminderValue' | 'reminderUnit' | 'reminderHour' | 'reminderMinute'>;
}> = ({ metric = { reminderHour: 0, reminderMinute: 0 } }) => {
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
  const { register, unregister, watch, setValue } = useFormContext<Metric>();
  const { reminder, reminderUnit } = watch(['reminder', 'reminderUnit'], {
    reminder: metric.reminder,
    reminderUnit: metric.reminderUnit,
  });

  useEffect(() => {
    register({ name: 'reminderHour' });
    register({ name: 'reminderMinute' });
    return () => {
      return unregister(['reminderHour', 'reminderMinute']);
    };
  }, [register, unregister, reminderUnit]);

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
          <Flex sx={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Field width={[1 / 3, 1 / 10]}>
              <Label>Every</Label>
              <Input type="number" name="reminderValue" ref={register} defaultValue={metric.reminderValue} />
            </Field>
            <Field width={[1 / 3, 1 / 4]}>
              <Label>&nbsp;</Label>
              <Select name="reminderUnit" ref={register} defaultValue={metric.reminderUnit}>
                <Option value={ReminderUnit.Day}>Days</Option>
                <Option value={ReminderUnit.Hour}>Hours</Option>
                <Option value={ReminderUnit.Minute}>Minutes</Option>
              </Select>
            </Field>

            {
              {
                [ReminderUnit.Day]: (
                  <Field width={[1 / 3, 1 / 10]}>
                    <Label>At (hh:mm)</Label>
                    <TimeInput
                      value={`${metric.reminderHour
                        ?.toString()
                        .padStart(2, '0')}:${metric.reminderMinute?.toString().padStart(2, '0')}`}
                      onChange={({ value }: any) => {
                        const [reminderHour, reminderMinute] = value.split(':');

                        setValue([{ reminderHour }, { reminderMinute }]);
                      }}
                    />
                  </Field>
                ),
                [ReminderUnit.Hour]: (
                  <Field width={[1 / 3, 1 / 10]}>
                    <Label>At (mm)</Label>
                    <Flex sx={{ alignItems: 'flex-end' }}>
                      <Input
                        type="number"
                        mr="2"
                        defaultValue={metric.reminderMinute}
                        onChange={({ target }: any) => setValue('reminderMinute', target.value)}
                      />
                      <Text sx={{ fontFamily: 'body' }}>minutes</Text>
                    </Flex>
                  </Field>
                ),
                [ReminderUnit.Minute]: null,
              }[reminderUnit || ReminderUnit.Day]
            }
          </Flex>
        </>
      )}
    </>
  );
};
