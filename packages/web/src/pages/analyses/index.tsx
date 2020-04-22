import * as React from 'react';
import { Heading } from 'rebass/styled-components';
import { Link } from '../../components/Link';
import { useGetAllAnalysesQuery } from '../../generated/graphql';

export const AnalysesListPage = () => {
  const { data, loading } = useGetAllAnalysesQuery();

  if (loading) return <>Loading...</>;

  if (!data) return <>No data</>;
  return (
    <>
      <Heading>All Metrics</Heading>
      <Link to="/metrics/new">Create new Metric</Link>
      <Link to="/analyses/create">Create new Analysis</Link>
      <ul>
        {data.allAnalyses.map((analysis) => (
          <li key={analysis.id}>
            <Link to={`/analyses/${analysis.id}`}>{analysis.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
