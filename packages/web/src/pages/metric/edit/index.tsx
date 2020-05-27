import { Input, Label, Select } from '@rebass/forms/styled-components';
import React from 'react';
import { useForm, FormContext } from 'react-hook-form';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Button, Flex, Heading } from 'rebass/styled-components';
import { Field } from '../../../components/Field';
import { Loader } from '../../../components/Loader';
import { Option } from '../../../components/Option';
import { Page } from '../../../components/Page';
import { useGetMetricByIdQuery, useUpdateMetricMutation } from '../../../generated/graphql';
import { MetricPermissionsFormControls } from '../PermissionsFormControls';

export const EditMetricPage = ({
  match: {
    params: { id },
  },
}: RouteComponentProps<{ id: string }>) => {
  const { data, loading } = useGetMetricByIdQuery({ variables: { id }, fetchPolicy: 'cache-and-network' });

  const [updateMetric] = useUpdateMetricMutation();
  const formMethods = useForm();
  const { register, handleSubmit, errors } = formMethods;
  const history = useHistory();

  if (!data || loading) {
    return (
      <Page>
        <Loader />
      </Page>
    );
  }

  return (
    <FormContext {...formMethods}>
      <Page
        as="form"
        onSubmit={handleSubmit(async ({ name, reminder, reminderUnit, reminderValue }) => {
          const { errors } = await updateMetric({
            variables: {
              id: data.metricById.id,
              metricInput: {
                name,
                reminder: reminder == true,
                reminderUnit,
                reminderValue: parseInt(reminderValue, 10),
              },
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

        <MetricPermissionsFormControls metric={data.metricById} />

        <Flex justifyContent="flex-end">
          <Button type="submit">Save</Button>
        </Flex>
      </Page>
    </FormContext>
  );
};
