import * as React from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Button, Flex, Heading } from 'rebass/styled-components';
import { Page } from '../../../components/Page';
import { useCreateAnalysisMutation } from '../../../generated/graphql';
import { FormControls } from '../FormControls';

export const CreateAnalysisPage = () => {
  const [createAnalysis] = useCreateAnalysisMutation();
  const formMethods = useForm();
  const { handleSubmit } = formMethods;
  const history = useHistory();

  return (
    <FormContext {...formMethods}>
      <Page
        onSubmit={handleSubmit(async ({ name, metricIds }) => {
          const { errors } = await createAnalysis({ variables: { name, metricIds: Object.keys(metricIds) } });

          if (errors) {
            console.error(errors);
            return;
          }

          history.push('/analyses');
        })}
        as="form"
      >
        <Heading>Create Analysis</Heading>
        <FormControls />
        <Flex justifyContent="flex-end" mt="4">
          <Button type="submit">Create</Button>
        </Flex>
      </Page>
    </FormContext>
  );
};
