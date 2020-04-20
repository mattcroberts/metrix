import { format } from 'date-fns';
import * as React from 'react';
import { Box } from 'rebass/styled-components';
import { CartesianGrid, ComposedChart, ResponsiveContainer, Scatter, Symbols, Tooltip, XAxis, YAxis } from 'recharts';
import { DataPoint, Metric } from '../../../generated/graphql';

export const MarkerChart = ({
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
