import { Input, Label, Select } from '@rebass/forms';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Flex } from 'rebass/styled-components';
import { useCreateAnalysisMutation, useGetAllMetricsQuery } from '../../../generated/graphql';

export const CreateAnalysisPage = () => {
  const { data: metrics, loading: metricsLloading } = useGetAllMetricsQuery();
  const [createAnalysis] = useCreateAnalysisMutation();
  const { register, handleSubmit } = useForm();

  if (metricsLloading || !metrics) {
    return null;
  }

  return (
    <Flex>
      <Box sx={{ background: 'white', width: '100%' }}>
        <form
          onSubmit={handleSubmit(({ name, metricIds }) => {
            createAnalysis({ variables: { name, metricIds } });
          })}
        >
          <Label>
            Name:
            <Input name="name" ref={register()} />
          </Label>
          <Label>
            Metrics:
            <Select sx={{ width: '100%' }} multiple name="metricIds" ref={register()}>
              {metrics.allMetrics.map((metric) => (
                <option value={metric.id}>{metric.name}</option>
              ))}
            </Select>
          </Label>
          <Button type="submit">Create</Button>
        </form>
      </Box>
    </Flex>
  );
};
