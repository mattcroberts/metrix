import * as React from 'react';
import { Edit, X } from 'react-feather';
import { Box, Button, Card, Flex, Heading, Text } from 'rebass/styled-components';
import { Link } from '../../components/Link';
import { Loader } from '../../components/Loader';
import { Page } from '../../components/Page';
import { useDeleteAnalysisMutation, useGetAllAnalysesQuery } from '../../generated/graphql';

export const AnalysesListPage = () => {
  const { data, loading, refetch } = useGetAllAnalysesQuery({ fetchPolicy: 'cache-and-network' });
  const [deleteAnalysis] = useDeleteAnalysisMutation();

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
      <Flex alignItems="center">
        <Heading>All Analyses</Heading>
        <Link to="/analyses/new" sx={{ marginLeft: 'auto' }}>
          <Button>Create Analysis</Button>
        </Link>
      </Flex>
      <Flex sx={{ flexWrap: 'wrap', my: 2, marginLeft: [-1, -2, -2], marginRight: [1, -2, -2] }}>
        {data.allAnalyses.map((analysis) => (
          <Card
            sx={{
              backgroundColor: 'primary',
              color: 'white',
              m: [1, 2, 2],
              minWidth: ['100%', 'calc(50% - 16px)', 'calc(33.3% - 16px)'],
              minHeight: '130px',
              boxShadow: `3px 3px 3px rgba(0,0,0, 0.5)`,
              display: 'flex',
            }}
          >
            <Box sx={{ marginRight: 'auto' }}>
              <Link key={analysis.id} to={`/analyses/${analysis.id}`} sx={{ textDecoration: 'none', color: 'white' }}>
                <Heading>{analysis.name}</Heading>

                {analysis.metrics.map((metric) => (
                  <Text>{metric.name}</Text>
                ))}
              </Link>
            </Box>

            <Flex sx={{ flexDirection: 'column', justifyContent: 'space-evenly', marginRight: 2 }}>
              <Link sx={{ color: 'white', display: 'inline-flex' }} to={`/analyses/${analysis.id}/edit`}>
                <Edit />
              </Link>
              <Link
                sx={{ color: 'white', display: 'inline-flex' }}
                onClick={async () => {
                  await deleteAnalysis({ variables: { id: analysis.id } });
                  await refetch();
                }}
              >
                <X />
              </Link>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Page>
  );
};
