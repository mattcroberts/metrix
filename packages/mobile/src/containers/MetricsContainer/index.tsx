import React from 'react';
import { Text, Button, StyleSheet } from 'react-native';
import MetricList from '../../components/MetricList';
import { useNavigation } from 'react-navigation-hooks';

interface MetricsContainerProps {}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default (props: MetricsContainerProps) => {
  const navigation = useNavigation();
  return (
    <>
      <Text style={styles.header}>Metrix</Text>
      <MetricList
        metrics={new Array(90).fill(null).map((_, i) => ({ name: `metric ${i}` }))}
        navigateToMetric={metric => navigation.navigate('Metric', { metric })}
      />

      <Button title="Add" onPress={() => {}} />
    </>
  );
};
