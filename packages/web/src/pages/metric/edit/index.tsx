import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps, useHistory } from 'react-router-dom';

const UPDATE_METRIC = gql`
  mutation UpdateMetric($id: String!, $metricInput: MetricInput!) {
    updateMetric(id: $id, metricInput: $metricInput) {
      id
      name
    }
  }
`;

export const MetricPage = ({
  match: {
    params: { id },
  },
}: RouteComponentProps<{ id: string }>) => {
  const { data, loading } = useQuery(
    gql`
      query Metric($id: String!) {
        metricById(id: $id) {
          id
          name
        }
      }
    `,
    { variables: { id } }
  );

  const [updateMetric] = useMutation(UPDATE_METRIC);
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  if (loading) return <p>Loading...</p>;
  if (!data) return null;

  return (
    <>
      <h1>Metric</h1>
      <form
        onSubmit={handleSubmit(async ({ name }) => {
          const { errors } = await updateMetric({ variables: { id: data.metricById.id, metricInput: { name } } });

          if (errors) {
            alert('error');
            return;
          }

          history.push(`/`);
        })}
      >
        <label>
          Name
          <input name="name" defaultValue={data.metricById.name} ref={register({ required: 'Required' })} />
        </label>

        <button type="submit">Save</button>
      </form>
    </>
  );
};
