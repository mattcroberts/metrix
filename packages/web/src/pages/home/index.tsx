import React from 'react';
import { Box, Button, Flex, Heading } from 'rebass/styled-components';
import { Link } from '../../components/Link';
import { useDeleteMetricMutation, useGetAllMetricsQuery, useRecordMetricMutation } from '../../generated/graphql';

export const HomePage = () => {
  const { loading, data } = useGetAllMetricsQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [recordMetric] = useRecordMetricMutation();
  const [deleteMetric] = useDeleteMetricMutation();

  if (loading) return <>Loading...</>;

  if (!data) return <>No data</>;

  return (
    <>
      <Heading sx={{ mb: 3, mt: 3 }}>Home</Heading>

      <Flex sx={{ flexWrap: 'wrap', alignContent: 'stretch' }}>
        {data.allMetrics.map((metric) => (
          <Flex
            key={metric.id}
            sx={{
              flexDirection: 'column',
              backgroundColor: 'muted',
              borderRadius: 2,
              p: 2,
              ml: 3,
              mr: 3,
              mb: 3,
              justifyContent: 'center',
              minWidth: '30%',
              maxWidth: '30%',
              flexGrow: 3,
            }}
          >
            <Box color="background" fontSize="2" sx={{ fontWeight: 'bold' }}>
              {metric.name}
            </Box>
            <Button
              sx={{ p: 4, mb: 2 }}
              onClick={() => {
                recordMetric({
                  variables: {
                    metricId: metric.id,
                  },
                });
              }}
            >
              Record
            </Button>
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
          </Flex>
        ))}
      </Flex>
    </>
  );
};
