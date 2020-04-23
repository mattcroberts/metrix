import React, { FC } from 'react';
import { Box, Button, Card, Flex } from 'rebass/styled-components';
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
        // flexDirection: 'column',
        backgroundColor: 'muted',
        // borderRadius: 2,
        // p: 2,
        m: 2,
        // justifyContent: 'center',
        minWidth: '31.5%',
      }}
    >
      <Box color="background" fontSize="2" sx={{ fontWeight: 'bold' }}>
        {metric.name}
      </Box>

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
