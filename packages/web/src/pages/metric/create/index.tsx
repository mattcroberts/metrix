import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useHistory } from 'react-router-dom';

const CREATE_METRIC = gql`
  mutation CreateMetric($name: String!) {
    createMetric(name: $name) {
      id
      name
    }
  }
`;

export const CreateMetricPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const [createMetric] = useMutation(CREATE_METRIC);
  const history = useHistory();

  return (
    <>
      <h1>Create Metric</h1>
      <form
        onSubmit={handleSubmit(async ({ name }) => {
          const { errors } = await createMetric({ variables: { name } });

          if (errors) {
            console.error(errors);
            return;
          }

          history.push('/metrics');
        })}
      >
        <label>
          Name
          <input name="name" ref={register({ required: 'Required' })} />
          <p>{errors.name && errors.name.message}</p>
        </label>

        <button type="submit">Create</button>
      </form>
    </>
  );
};
