import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button, Flex, Heading } from 'rebass/styled-components';
import { Field } from '../../../components/Field';
import { Page } from '../../../components/Page';
import { useCreateAnalysisMutation, useGetAllMetricsQuery } from '../../../generated/graphql';

import { Input, Label, Select } from '@rebass/forms/styled-components';

export const CreateAnalysisPage = () => {
  const { data: metrics, loading: metricsLloading } = useGetAllMetricsQuery();
  const [createAnalysis] = useCreateAnalysisMutation();
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  if (metricsLloading || !metrics) {
    return null;
  }

  return (
    <Page
      onSubmit={handleSubmit(async ({ name, metricIds }) => {
        const { errors } = await createAnalysis({ variables: { name, metricIds } });

        if (errors) {
          console.error(errors);
          return;
        }

        history.push('/analyses');
      })}
      as="form"
    >
      <Heading mt="2">Create Analysis</Heading>
      <Flex sx={{ alignItems: 'flex-start' }}>
        <Field>
          <Label sx={{ mb: 1 }}>Name</Label>
          <Input name="name" ref={register({ required: 'Required' })} />
          {errors.name && <p>errors.name.message</p>}
        </Field>
        <Field>
          <Label>Metrics</Label>
          <Select sx={{ width: '100%' }} multiple name="metricIds" ref={register({ required: 'Required' })}>
            {metrics.allMetrics.map((metric) => (
              <option value={metric.id}>{metric.name}</option>
            ))}
          </Select>
        </Field>
      </Flex>
      <Flex justifyContent="flex-end">
        <Button type="submit">Create</Button>
      </Flex>
    </Page>
  );
};
