import { format } from 'date-fns';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Box, Flex, Heading, Text } from 'rebass/styled-components';
import { CartesianGrid, ComposedChart, Line, ResponsiveContainer, Scatter, Symbols, XAxis, YAxis } from 'recharts';
import { colors } from '../../../colors';
import { MetricType, useGetAnalysisWithDataQuery, RatingDataPoint } from '../../../generated/graphql';

export const AnalysisPage = ({
  match: {
    params: { id },
  },
}: RouteComponentProps<{ id: string }>) => {
  const { data, loading } = useGetAnalysisWithDataQuery({ variables: { id } });

  if (loading || !data) return <>Loading...</>;
  const { metrics } = data.getAnalysisWithData;

  if (!metrics[0].dataPoints.length) {
    return <Text>No Data</Text>;
  }
  return (
    <Flex sx={{ my: 2, flexDirection: 'column' }}>
      <Heading>{data.getAnalysisWithData.name}</Heading>

      <Box sx={{ background: 'white', m: 3 }}>
        <ResponsiveContainer aspect={4}>
          <ComposedChart>
            <CartesianGrid horizontal={false} />

            <XAxis
              dataKey={`datetime`}
              type="number"
              domain={['auto', 'auto']}
              tickFormatter={(date: number) => format(new Date(date), 'P')}
              dy={10}
              tickCount={10}
              interval="preserveStartEnd"
            />

            <YAxis dataKey="y" domain={[0, metrics.length + 1]} hide={true} />

            {metrics.map((metric, i) => {
              if (metric.type === MetricType.RatingDataPoint) {
                return [
                  <YAxis dataKey="rating" domain={[0, 'auto']} orientation="right" yAxisId={metric.id} />,
                  <Line
                    yAxisId={metric.id}
                    key={metric.id}
                    data={(metric.dataPoints as RatingDataPoint[]).map(({ datetime, rating }) => ({
                      rating,
                      datetime: new Date(datetime).getTime(),
                    }))}
                    dataKey="rating"
                    stroke={colors[i]}
                  />,
                ];
              }
              return (
                <Scatter
                  key={metric.id}
                  fill={colors[i]}
                  data={metric.dataPoints.map(({ datetime }) => ({
                    y: i + 1,
                    datetime: new Date(datetime).getTime(),
                  }))}
                  name={metric.name}
                  shape={(props) => <Symbols {...props} size={256} />}
                />
              );
            })}
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Flex>
  );
};
