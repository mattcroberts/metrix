import * as React from 'react';
import { useGetAllMetricsQuery } from '../../generated/graphql';
import { Link } from '../../components/Link';
import { Heading } from 'rebass/styled-components';

export const AnalysesPage = () => {
  const { data, loading } = useGetAllMetricsQuery();

  if (loading) return <>Loading...</>;

  if (!data) return <>No data</>;
  return (
    <>
      <Heading>All Metrics</Heading>
      <Link to="/metrics/new">Create new Metric</Link>
      <ul>
        {data.allMetrics.map((metric) => (
          <li key={metric.id}>
            <Link to={`/metrics/${metric.id}`}>{metric.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
