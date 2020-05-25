import { Checkbox } from '@rebass/forms';
import { Input, Label, Select } from '@rebass/forms/styled-components';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Button, Flex, Heading } from 'rebass/styled-components';
import { Field } from '../../../components/Field';
import { Loader } from '../../../components/Loader';
import { Option } from '../../../components/Option';
import { Page } from '../../../components/Page';
import { ReminderUnit, useGetMetricByIdQuery, useUpdateMetricMutation } from '../../../generated/graphql';
import { registerDevice } from '../../../registerDevice';

export const EditMetricPage = ({
  match: {
    params: { id },
  },
}: RouteComponentProps<{ id: string }>) => {
  const { data, loading } = useGetMetricByIdQuery({ variables: { id }, fetchPolicy: 'cache-and-network' });

  const [updateMetric] = useUpdateMetricMutation();
  const { register, handleSubmit, errors, watch } = useForm();
  const history = useHistory();
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);

  if (!data || loading) {
    return (
      <Page>
        <Loader />
      </Page>
    );
  }
  const reminder = watch('reminder');
  return (
    <Page
      as="form"
      onSubmit={handleSubmit(async ({ name, reminder, reminderUnit, reminderValue }) => {
        const { errors } = await updateMetric({
          variables: {
            id: data.metricById.id,
            metricInput: { name, reminder: reminder == true, reminderUnit, reminderValue: parseInt(reminderValue, 10) },
          },
        });

        if (errors) {
          alert('error');
          return;
        }

        history.push(`/`);
      })}
    >
      <Heading>{data.metricById.name} - Edit</Heading>

      <Flex sx={{ alignItems: 'flex-start', flexDirection: ['column', 'row'] }}>
        <Field>
          <Label>Name</Label>
          <Input name="name" defaultValue={data.metricById.name} ref={register({ required: 'Required' })} />
        </Field>
        <Field>
          <Label>Type</Label>
          <Select name="type" ref={register({ required: 'Required' })} defaultValue={data.metricById.type}>
            <Option value="DataPoint">Marker</Option>
            <Option value="RatingDataPoint">Rating</Option>
          </Select>
          {errors.type && <p>errors.type.message</p>}
        </Field>
      </Flex>

      {(notificationPermission !== 'granted' && (
        <Flex>
          <Button
            onClick={async () => {
              const permission = await registerDevice();
              setNotificationPermission(permission);
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
              <Checkbox name="reminder" ref={register} defaultChecked={data.metricById.reminder} />
            </Label>
          </Field>
        </Flex>
      )}

      {notificationPermission === 'granted' && reminder && (
        <>
          <Flex sx={{ flexDirection: 'row' }}>
            <Field width={[1 / 3, 1 / 10]}>
              <Label>Every</Label>
              <Input type="number" name="reminderValue" ref={register()} defaultValue={data.metricById.reminderValue} />
            </Field>
            <Field width={[2 / 3, 1 / 4]}>
              <Label>&nbsp;</Label>
              <Select name="reminderUnit" ref={register()} defaultValue={data.metricById.reminderUnit}>
                <Option value={ReminderUnit.Day}>Days</Option>
                <Option value={ReminderUnit.Hour}>Hours</Option>
                <Option value={ReminderUnit.Minute}>Minutes</Option>
              </Select>
            </Field>
          </Flex>
        </>
      )}

      <Flex justifyContent="flex-end">
        <Button type="submit">Save</Button>
      </Flex>
    </Page>
  );
};
