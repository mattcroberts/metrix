import { Input, Label, Select } from '@rebass/forms/styled-components';
import React from 'react';
import { useForm, FormContext } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button, Flex, Heading } from 'rebass/styled-components';
import { Field } from '../../../components/Field';
import { Option } from '../../../components/Option';
import { Page } from '../../../components/Page';
import { useCreateMetricMutation } from '../../../generated/graphql';
import { MetricReminderFormControls } from '../ReminderFormControls';

export const CreateMetricPage = () => {
  const formMethods = useForm();
  const { register, handleSubmit, errors } = formMethods;
  const [createMetric] = useCreateMetricMutation();
  const history = useHistory();

  return (
    <FormContext {...formMethods}>
      <Page
        as="form"
        onSubmit={handleSubmit(
          async ({ name, type, reminder, reminderUnit, reminderValue, reminderHour, reminderMinute }) => {
            const { errors } = await createMetric({
              variables: {
                metric: {
                  name,
                  reminder: reminder == true,
                  reminderUnit,
                  reminderValue: parseInt(reminderValue, 10),
                  reminderHour: parseInt(reminderHour, 10),
                  reminderMinute: parseInt(reminderMinute, 10),
                },
                type,
              },
            });

            if (errors) {
              console.error(errors);
              return;
            }

            history.push('/');
          }
        )}
      >
        <Heading>Create Metric</Heading>

        <Flex sx={{ alignItems: 'flex-start' }}>
          <Field>
            <Label sx={{ mb: 1 }}>Name</Label>
            <Input name="name" ref={register({ required: 'Required' })} />
            {errors.name && <p>errors.name.message</p>}
          </Field>
          <Field>
            <Label sx={{ mb: 1 }}>Type</Label>
            <Select name="type" ref={register({ required: 'Required' })}>
              <Option value="DataPoint">Marker</Option>
              <Option value="RatingDataPoint">Rating</Option>
            </Select>
            {errors.type && <p>errors.type.message</p>}
          </Field>
        </Flex>
        <MetricReminderFormControls />
        <Flex justifyContent="flex-end" mt="4">
          <Button type="submit">Create</Button>
        </Flex>
      </Page>
    </FormContext>
  );
};
