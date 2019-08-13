import React from 'react';
import { View, Text, Button } from 'react-native';
import { Metric } from '../../types';

interface Props {
  metric: Metric;
  onButtonPress: () => void;
}

export default ({ onButtonPress, metric }: Props) => {
  console.warn('Metric', metric);
  return (
    <View>
      <Text>Metric - {metric.name}</Text>
      <Button title="Record Metric" onPress={onButtonPress} />
    </View>
  );
};
