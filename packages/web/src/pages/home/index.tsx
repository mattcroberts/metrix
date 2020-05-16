import React from 'react';
import { Flex, Heading } from 'rebass/styled-components';
import { useGetAllMetricsQuery } from '../../generated/graphql';
import { MetricCard } from './MetricCard';
import { Page } from '../../components/Page';
import { Loader } from '../../components/Loader';

export const HomePage = () => {
  const { loading, data } = useGetAllMetricsQuery({
    fetchPolicy: 'cache-and-network',
  });

  if (!data || loading) {
    return (
      <Page>
        <Heading>Home</Heading>
        <Loader />
      </Page>
    );
  }
  return (
    <Page>
      <Heading>Home</Heading>

      <Flex mx={-2} sx={{ flexWrap: 'wrap' }}>
        {data.allMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </Flex>
    </Page>
  );
};
