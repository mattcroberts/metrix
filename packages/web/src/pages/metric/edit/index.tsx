import React from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useGetMetricByIdQuery, useUpdateMetricMutation } from '../../../generated/graphql';
import { Page } from '../../../components/Page';
import { Heading } from 'rebass/styled-components';

export const EditMetricPage = ({
  match: {
    params: { id },
  },
}: RouteComponentProps<{ id: string }>) => {
  const { data, loading } = useGetMetricByIdQuery({ variables: { id } });

  const [updateMetric] = useUpdateMetricMutation();
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  if (loading) return <p>Loading...</p>;
  if (!data) return null;

  return (
    <Page>
      <Heading>Metric</Heading>
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
    </Page>
  );
};
