import * as React from 'react';
import { Heading, Flex, Card, Text } from 'rebass/styled-components';
import { Link } from '../../components/Link';
import { useGetAllAnalysesQuery } from '../../generated/graphql';
import { Page } from '../../components/Page';
import { Loader } from '../../components/Loader';

export const AnalysesListPage = () => {
  const { data, loading } = useGetAllAnalysesQuery({ fetchPolicy: 'cache-and-network' });

  if (!data || loading) {
    return (
      <Page>
        <Heading>All Analyses</Heading>
        <Loader />
      </Page>
    );
  }

  return (
    <Page>
      <Heading>All Analyses</Heading>
      <Flex mx={-2} sx={{ flexWrap: 'wrap' }}>
        {data.allAnalyses.map((analysis) => (
          <Link key={analysis.id} to={`/analyses/${analysis.id}`} sx={{ textDecoration: 'none' }}>
            <Card
              sx={{
                backgroundColor: 'primary',
                color: 'white',
                m: [1, 2, 2],
                minWidth: ['100%', 'calc(50% - 16px)', 'calc(33.3% - 16px)'],
                boxShadow: `3px 3px 3px rgba(0,0,0, 0.5)`,
              }}
            >
              <Heading>{analysis.name}</Heading>
              {analysis.metrics.map((metric) => (
                <Text>{metric.name}</Text>
              ))}
            </Card>
          </Link>
        ))}
      </Flex>
    </Page>
  );
};
