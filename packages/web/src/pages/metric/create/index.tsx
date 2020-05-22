import { Input, Label, Select } from '@rebass/forms/styled-components';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button, Flex, Heading } from 'rebass/styled-components';
import { Field } from '../../../components/Field';
import { Option } from '../../../components/Option';
import { Page } from '../../../components/Page';
import { useCreateMetricMutation } from '../../../generated/graphql';

export const CreateMetricPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const [createMetric] = useCreateMetricMutation();
  const history = useHistory();

  return (
    <Page
      as="form"
      onSubmit={handleSubmit(async ({ name, type }) => {
        const { errors } = await createMetric({ variables: { name, type } });

        if (errors) {
          console.error(errors);
          return;
        }

        history.push('/metrics');
      })}
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
      <Flex justifyContent="flex-end" mt="4">
        <Button type="submit">Create</Button>
      </Flex>
    </Page>
  );
};
