import React from 'react';
import { Heading, Text } from 'rebass/styled-components';
import { useForm } from 'react-hook-form';

export const MetricPage = ({ metric = {} }: { metric: any }) => {
  const { register, handleSubmit } = useForm();
  return (
    <>
      <Heading>Metric</Heading>
      <form onSubmit={handleSubmit(() => undefined)}>
        <Text>Metric text</Text>
        <label>
          Name
          <input defaultValue={metric.name} ref={register} />
        </label>

        <button type="submit">Save</button>
      </form>
    </>
  );
};
