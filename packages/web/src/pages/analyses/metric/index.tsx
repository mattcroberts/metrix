import * as React from 'react';
import { useGetMetricWithDataPointsQuery } from '../../../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';

export const MetricAnalysisPage = ({
  match: {
    params: { id },
  },
}: RouteComponentProps<{ id: string }>) => {
  const { data, loading } = useGetMetricWithDataPointsQuery({ variables: { metricId: id } });

  if (loading || !data) return <>Loading...</>;

  return null;
};
