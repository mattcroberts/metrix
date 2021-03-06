import { format } from 'date-fns';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Box, Flex, Heading } from 'rebass/styled-components';
import { CartesianGrid, ComposedChart, ResponsiveContainer, Scatter, Symbols, Tooltip, XAxis, YAxis } from 'recharts';
import { DataPoint, Metric, useGetMetricWithDataPointsQuery } from '../../../generated/graphql';

const MarkerChart = ({
  dataPoints,
  metric,
}: {
  dataPoints: Pick<DataPoint, 'datetime'>[];
  metric: Pick<Metric, 'id' | 'name'>;
}) => {
  const scatterMarkerData = dataPoints.map(({ datetime }) => ({
    datetime: new Date(datetime).getTime(),
    y: 1,
  }));

  return (
    <Box sx={{ background: 'white', m: 3 }}>
      <ResponsiveContainer aspect={7}>
        <ComposedChart data={scatterMarkerData}>
          <CartesianGrid horizontal={false} />
          <XAxis
            dataKey="datetime"
            type="number"
            domain={['auto', 'auto']}
            tickFormatter={(date: number) => format(new Date(date), 'P')}
            dy={10}
          />
          <Tooltip
            filterNull={false}
            labelFormatter={() => metric.name}
            formatter={(value, name, { payload }) => format(new Date(payload.datetime), 'Pp')}
          />
          <Scatter fill="red" yAxisId="right" shape={(props) => <Symbols {...props} size={256} />} />
          <YAxis dataKey="y" name={metric.name} domain={[0, 2]} yAxisId="right" hide={true} />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export const MetricAnalysisPage = ({
  match: {
    params: { id },
  },
}: RouteComponentProps<{ id: string }>) => {
  const { data, loading } = useGetMetricWithDataPointsQuery({ variables: { metricId: id } });

  if (loading || !data) return <>Loading...</>;

  return (
    <Flex sx={{ my: 2, flexDirection: 'column' }}>
      <Heading>{data.metricById.name}</Heading>
      <MarkerChart metric={data.metricById} dataPoints={data.metricById.dataPoints} />
    </Flex>
  );
};
