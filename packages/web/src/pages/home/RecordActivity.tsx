import React, { FC, useState } from 'react';
import { Box, Button } from 'rebass/styled-components';
import { Metric, MetricType, useRecordDataPointMutation } from '../../generated/graphql';
import { Forms } from './MetricCard';

export const RecordActivity: FC<{
  metric: Pick<Metric, 'id' | 'name' | 'type'>;
}> = ({ metric }) => {
  const [recordDataPoint] = useRecordDataPointMutation();
  const [isOpen, setOpen] = useState(false);
  const Form = Forms[metric.type];
  return (
    <>
      <Button
        sx={{ p: 4, mb: 2 }}
        onClick={async () => {
          setOpen(true);
          if (metric.type === MetricType.DataPoint) {
            await recordDataPoint({
              variables: {
                metricId: metric.id,
                data: {},
              },
            });
            setOpen(false);
          }
        }}
      >
        Record
      </Button>
      <Box sx={{ backgroundColor: 'primary', display: isOpen ? 'block' : 'none' }}>
        <Form
          save={({ rating }) =>
            recordDataPoint({
              variables: {
                metricId: metric.id,
                data: {
                  rating,
                },
              },
            })
          }
        />
      </Box>
    </>
  );
};
