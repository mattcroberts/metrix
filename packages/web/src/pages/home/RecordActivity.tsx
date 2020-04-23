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
      {isOpen ? (
        <Box sx={{ backgroundColor: 'primary', minHeight: '82px', mb: 2, p: 4 }}>
          <Form
            save={async ({ rating }) => {
              await recordDataPoint({
                variables: {
                  metricId: metric.id,
                  data: {
                    rating,
                  },
                },
              });

              setOpen(false);
            }}
          />
        </Box>
      ) : (
        <Button
          sx={{ p: 4, width: '100%', mb: 2 }}
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
      )}
    </>
  );
};
