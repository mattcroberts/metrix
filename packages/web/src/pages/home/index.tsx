import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

const GET_ALL_METRICS = gql`
  query getAllMetrics {
    allMetrics {
      id
      name
    }
  }
`;

const RECORD_METRIC = gql`
  mutation recordMetric($metricId: String!) {
    recordMetric(metricId: $metricId) {
      id
      name
      dataPoints {
        id
        datetime
      }
    }
  }
`;

const DELETE_METRIC = gql`
  mutation deleteMetric($id: String!) {
    deleteMetric(id: $id) {
      id
    }
  }
`;

export const HomePage = () => {
  const { loading, data } = useQuery<{ allMetrics: { id: string; name: string }[] }>(GET_ALL_METRICS, {
    fetchPolicy: 'cache-and-network',
  });

  const [recordMetric] = useMutation(RECORD_METRIC);
  const [deleteMetric] = useMutation(DELETE_METRIC);

  console.log({ data });

  if (loading) return <>Loading...</>;

  if (!data) return <>No data</>;

  return (
    <>
      <h1>Home</h1>
      <Link to="/metrics">Edit Metrics</Link>
      <ul>
        {data.allMetrics.map((metric) => (
          <li key={metric.id}>
            <p>{metric.name}</p>
            <button
              onClick={() =>
                recordMetric({
                  variables: {
                    metricId: metric.id,
                  },
                })
              }
            >
              Record
            </button>

            <button
              onClick={() =>
                deleteMetric({
                  variables: { id: metric.id },
                  refetchQueries: ['getAllMetrics'],
                })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
