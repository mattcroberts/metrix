import { format } from 'date-fns';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Box, Heading, Text } from 'rebass/styled-components';
import { CartesianGrid, ComposedChart, Line, ResponsiveContainer, Scatter, Symbols, XAxis, YAxis } from 'recharts';
import { colors } from '../../../colors';
import { Page } from '../../../components/Page';
import { MetricType, RatingDataPoint, useGetAnalysisWithDataQuery } from '../../../generated/graphql';
import { useScreenOrientation } from '../../../hooks/screen-orientation';
import { theme } from '../../../theme';

const MARGIN = theme.space[3];

export const AnalysisPage = ({
  match: {
    params: { id },
  },
}: RouteComponentProps<{ id: string }>) => {
  const { data, loading } = useGetAnalysisWithDataQuery({ variables: { id } });
  const orientation = useScreenOrientation();

  if (loading || !data) return <>Loading...</>;
  const { metrics } = data.getAnalysisWithData;

  if (!metrics[0].dataPoints.length) {
    return <Text>No Data</Text>;
  }

  return (
    <Page>
      <Heading>{data.getAnalysisWithData.name}</Heading>

      <Box
        sx={{
          background: 'white',
          marginTop: 3,
          height: orientation === 'landscape-primary' ? '60vh' : '50vh',
        }}
      >
        <ResponsiveContainer>
          <ComposedChart
            margin={{ top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN }}
            style={{ fontFamily: theme.fonts.body }}
          >
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
    </Page>
  );
};
