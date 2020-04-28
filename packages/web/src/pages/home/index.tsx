import React from 'react';
import { Flex, Heading } from 'rebass/styled-components';
import { useGetAllMetricsQuery } from '../../generated/graphql';
import { MetricCard } from './MetricCard';
import { Page } from '../../components/Page';

export const HomePage = () => {
  const { loading, data } = useGetAllMetricsQuery({
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <>Loading...</>;

  if (!data) return <>No data</>;

  return (
    <Page>
      <Heading sx={{ mb: 2 }}>Home</Heading>

      <Flex mx={-2} sx={{ flexWrap: 'wrap' }}>
        {data.allMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </Flex>
    </Page>
  );
};
