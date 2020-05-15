import React, { FC } from 'react';
import { Box, Button, Card, Flex, Heading } from 'rebass/styled-components';
import { Link } from '../../components/Link';
import { Metric, MetricType, useDeleteMetricMutation } from '../../generated/graphql';
import { RecordActivity } from './RecordActivity';

export const Forms: { [key in MetricType]: FC<{ save: ({ rating }: { rating: number }) => void }> } = {
  DataPoint: () => <>'Datapoint'</>,
  RatingDataPoint: ({ save }) => (
    <Box>
      Rating
      <Box>
        {new Array(10).fill(0).map((rating, i) => (
          <button key={i.toString()} onClick={() => save({ rating: i })}>
            {i}
          </button>
        ))}
      </Box>
    </Box>
  ),
};

export const MetricCard: FC<{
  metric: Pick<Metric, 'id' | 'name' | 'type'>;
}> = ({ metric }) => {
  const [deleteMetric] = useDeleteMetricMutation();

  return (
    <Card
      sx={{
        backgroundColor: 'muted',
        m: 2,
        minWidth: '31.5%',
        boxShadow: `3px 3px 3px rgba(0,0,0, 0.5)`,
      }}
    >
      <Heading color="background" fontSize={2}>
        {metric.name}
      </Heading>

      <RecordActivity metric={metric} />
      <Flex justifyContent="space-evenly">
        <Link to={`/metrics/${metric.id}/edit`} width="50%" mr="2">
          <Button width="100%">Edit</Button>
        </Link>
        <Button
          width="50%"
          onClick={() =>
            deleteMetric({
              variables: { id: metric.id },
              refetchQueries: ['getAllMetrics'],
            })
          }
        >
          Delete
        </Button>
      </Flex>
    </Card>
  );
};
