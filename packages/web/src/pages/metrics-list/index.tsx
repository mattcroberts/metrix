import React from 'react';
import { Link } from 'react-router-dom';

const dummyData = [{ name: 'Metric1', id: '123' }];

export const MetricListPage = ({ metrics = dummyData }: { metrics: any[] }) => (
  <>
    <h1>All Metrics</h1>
    <ul>
      {metrics.map((metric) => (
        <li>
          <Link to={`/metrics/${metric.id}`}>{metric.name}</Link>
        </li>
      ))}
    </ul>
  </>
);
