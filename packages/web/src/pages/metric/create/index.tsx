import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useHistory } from 'react-router-dom';
import { Flex, Box, Button, Heading } from 'rebass/styled-components';
import { Input, Label } from '@rebass/forms';

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
      <Flex
        sx={{ borderColor: 'muted', borderWidth: 1, borderStyle: 'solid', padding: 3 }}
        as="form"
        flexDirection="column"
        onSubmit={handleSubmit(async ({ name }) => {
          const { errors } = await createMetric({ variables: { name } });

          if (errors) {
            console.error(errors);
            return;
          }

          history.push('/metrics');
        })}
      >
        <Heading mt="2">Create Metric</Heading>
        <Box margin="4" ml="0">
          <Label>
            Name
            <Input marginLeft="3" maxWidth="60%" name="name" ref={register({ required: 'Required' })} />
            <p>{errors.name && errors.name.message}</p>
          </Label>
        </Box>
        <Flex justifyContent="flex-end" mr="4">
          <Button type="submit">Create</Button>
        </Flex>
      </Flex>
    </>
  );
};
