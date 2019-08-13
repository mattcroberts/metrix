import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import MetricContainer from './containers/MetricContainer';
import MetricListContainer from './containers/MetricsContainer';

const AppNavigator = createStackNavigator({
  MetricsList: {
    screen: MetricListContainer,
  },
  Metric: {
    screen: MetricContainer,
  },

  initialRouteName: 'MetricsList',
});

const AppContainer = createAppContainer(AppNavigator);
export default () => <AppContainer />;
