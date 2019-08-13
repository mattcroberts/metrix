import React from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { Metric } from '../../types';

const screenWidth = Math.round(Dimensions.get('window').width);
const margin = 10;
const columns = 3;
const dim = screenWidth / columns - margin * 2;
interface Props {
  metrics: Metric[];
  navigateToMetric: (metric: Metric) => undefined;
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  listItem: {
    flex: 1,
    minWidth: dim,
    height: dim,
    marginLeft: margin,
    marginTop: margin,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ({ metrics, navigateToMetric }: Props) => {
  return (
    <ScrollView contentContainerStyle={styles.list}>
      {metrics.map((metric, i) => (
        <TouchableHighlight key={i.toString()} style={styles.listItem} onPress={() => navigateToMetric(metric)}>
          <Text key={i.toString()}>{metric.name}</Text>
        </TouchableHighlight>
      ))}
    </ScrollView>
  );
};
