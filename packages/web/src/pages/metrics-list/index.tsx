import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useGetAllMetricsQuery } from '../../generated/graphql';

const MetricsListContainer = () => {
  const { loading, data } = useGetAllMetricsQuery({ fetchPolicy: 'cache-and-network' });

  console.log({ data });

  if (loading) return <>Loading...</>;

  if (!data) return <>No data</>;
  return (
    <>
      <h1>All Metrics</h1>
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

export const MetricListPage = () => {
  return <MetricsListContainer />;
};
