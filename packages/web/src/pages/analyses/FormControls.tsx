import { Input, Label } from '@rebass/forms/styled-components';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Flex, Text } from 'rebass/styled-components';
import { Field } from '../../components/Field';
import { Analysis, useGetAllMetricsQuery } from '../../generated/graphql';

export const FormControls: React.FC<{ analysis?: Partial<Analysis> }> = ({ analysis }) => {
  const { data: { allMetrics } = { allMetrics: [] } } = useGetAllMetricsQuery();

  const { register, errors, watch } = useFormContext();
  const selectedMetrics = watch('metricIds', {
    metricIds: analysis?.metrics?.reduce((acc, { id }) => ({ ...acc, [id]: true }), {}) || {},
  });

  return (
    <>
      <Field sx={{ maxWidth: '400px' }}>
        <Label sx={{ mb: 1 }}>Name</Label>
        <Input name="name" ref={register({ required: 'Required' })} defaultValue={analysis?.name} />
        {errors.name && <p>errors.name.message</p>}
      </Field>
      <Field>
        <Label>Metrics</Label>

        <Flex sx={{ flexWrap: 'wrap', mx: -2 }}>
          {allMetrics.map((metric) => (
            <Box
              key={metric.id}
              as="label"
              sx={{
                width: '400px',
                cursor: 'pointer',
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: selectedMetrics[metric.id] ? 'secondary' : 'muted',
                borderRadius: 2,
                padding: 2,
                margin: 2,
                fontFamily: 'body',
              }}
            >
              <Text variant="ellipsis">{metric.name}</Text>
              <Text variant="ellipsis">({metric.type})</Text>
              <input type="checkbox" ref={register} name={`metricIds[${metric.id}]`} hidden />
            </Box>
          ))}
        </Flex>
      </Field>
    </>
  );
};
