import { Input, Label, Select } from '@rebass/forms/styled-components';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button, Flex, Heading } from 'rebass/styled-components';
import { Field } from '../../../components/Field';
import { useCreateMetricMutation } from '../../../generated/graphql';
import { Page } from '../../../components/Page';

export const CreateMetricPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const [createMetric] = useCreateMetricMutation();
  const history = useHistory();

  return (
    <Page>
      <Heading mt="2">Create Metric</Heading>
      <form
        onSubmit={handleSubmit(async ({ name, type }) => {
          const { errors } = await createMetric({ variables: { name, type } });

          if (errors) {
            console.error(errors);
            return;
          }

          history.push('/metrics');
        })}
      >
        <Flex sx={{ alignItems: 'flex-start' }}>
          <Field>
            <Label sx={{ mb: 1 }}>Name</Label>
            <Input name="name" ref={register({ required: 'Required' })} />
            {errors.name && <p>errors.name.message</p>}
          </Field>
          <Field>
            <Label sx={{ mb: 1 }}>Type</Label>
            <Select name="type" ref={register({ required: 'Required' })}>
              <option value="DataPoint">Marker</option>
              <option value="RatingDataPoint">Rating</option>
            </Select>
            {errors.type && <p>errors.type.message</p>}
          </Field>
        </Flex>
        <Flex justifyContent="flex-end">
          <Button type="submit">Create</Button>
        </Flex>
      </form>
    </Page>
  );
};
