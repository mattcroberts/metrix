import * as React from 'react';
import { Heading } from 'rebass/styled-components';
import { Link } from '../../components/Link';
import { useGetAllAnalysesQuery } from '../../generated/graphql';
import { Page } from '../../components/Page';

export const AnalysesListPage = () => {
  const { data, loading } = useGetAllAnalysesQuery({ fetchPolicy: 'cache-and-network' });

  if (loading) return <>Loading...</>;

  if (!data) return <>No data</>;
  return (
    <Page>
      <Heading sx={{ my: 3, mx: 2 }}>All Analyses</Heading>

      <ul>
        {data.allAnalyses.map((analysis) => (
          <li key={analysis.id}>
            <Link to={`/analyses/${analysis.id}`}>{analysis.name}</Link>
          </li>
        ))}
      </ul>
    </Page>
  );
};
