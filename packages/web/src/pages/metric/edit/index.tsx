import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router-dom';

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
  const { register, handleSubmit } = useForm();

  if (loading) return <p>Loading...</p>;
  if (!data) return null;

  return (
    <>
      <h1>Metric</h1>
      <form onSubmit={handleSubmit(() => undefined)}>
        <label>
          Name
          <input defaultValue={data.metricById.name} ref={register} />
        </label>

        <button type="submit">Save</button>
      </form>
    </>
  );
};
