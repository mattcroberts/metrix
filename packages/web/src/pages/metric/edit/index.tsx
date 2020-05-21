import { Input, Label, Select } from '@rebass/forms/styled-components';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Button, Flex, Heading } from 'rebass/styled-components';
import { Field } from '../../../components/Field';
import { Loader } from '../../../components/Loader';
import { Page } from '../../../components/Page';
import { useGetMetricByIdQuery, useUpdateMetricMutation } from '../../../generated/graphql';
import { registerDevice } from '../../../registerDevice';

export const EditMetricPage = ({
  match: {
    params: { id },
  },
}: RouteComponentProps<{ id: string }>) => {
  const { data, loading } = useGetMetricByIdQuery({ variables: { id } });

  const [updateMetric] = useUpdateMetricMutation();
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  if (!data || loading) {
    return (
      <Page>
        <Loader />
      </Page>
    );
  }

  return (
    <Page
      as="form"
      onSubmit={handleSubmit(async ({ name }) => {
        const { errors } = await updateMetric({ variables: { id: data.metricById.id, metricInput: { name } } });

        if (errors) {
          alert('error');
          return;
        }

        history.push(`/`);
      })}
    >
      <Heading>{data.metricById.name} - Edit</Heading>

      <Flex sx={{ alignItems: 'flex-start' }}>
        <Field>
          <Label>Name</Label>
          <Input name="name" defaultValue={data.metricById.name} ref={register({ required: 'Required' })} />
        </Field>
        <Field>
          <Label>Type</Label>
          <Select name="type" ref={register({ required: 'Required' })}>
            <option value="DataPoint">Marker</option>
            <option value="RatingDataPoint">Rating</option>
          </Select>
          {errors.type && <p>errors.type.message</p>}
        </Field>
      </Flex>

      {Notification.permission !== 'granted' && (
        <Flex>
          <Button onClick={registerDevice}>Setup Reminders</Button>
        </Flex>
      )}

      <Flex sx={{ flexDirection: 'row' }}>
        <Field>
          <Label>Every</Label>
          <Input type="number" />
        </Field>
        <Field>
          <Select>
            <option>Days</option>
            <option>Hours</option>
            <option>minutes</option>
          </Select>
        </Field>
      </Flex>

      <Flex justifyContent="flex-end">
        <Button type="submit">Save</Button>
      </Flex>
    </Page>
  );
};
