import React from 'react';
import MetricComponent from '../../components/Metric';
import { useNavigationParam } from 'react-navigation-hooks';
import { Metric } from '../../types';

export default () => {
  const metric: Metric = useNavigationParam('metric');
  return <MetricComponent metric={metric} onButtonPress={() => undefined} />;
};
