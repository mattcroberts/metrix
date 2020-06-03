import * as React from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { Button, Flex, Heading } from 'rebass/styled-components';
import { Loader } from '../../../components/Loader';
import { Page } from '../../../components/Page';
import { useGetAnalysisWithDataQuery, useUpdateAnalysisMutation } from '../../../generated/graphql';
import { FormControls } from '../FormControls';

export const EditAnalysisPage: React.FC<RouteComponentProps<{ id: string }>> = ({
  match: {
    params: { id: analysisId },
  },
}) => {
  const { data, loading } = useGetAnalysisWithDataQuery({ variables: { id: analysisId } });
  const [updateAnalysis] = useUpdateAnalysisMutation();
  const formMethods = useForm();
  const { handleSubmit } = formMethods;
  const history = useHistory();

  const analysis = data?.getAnalysisWithData;

  if (!analysis || loading) {
    return (
      <Page>
        <Loader />;
      </Page>
    );
  }

  return (
    <FormContext {...formMethods}>
      <Page
        onSubmit={handleSubmit(async ({ name, metricIds }) => {
          const { errors } = await updateAnalysis({
            variables: {
              id: analysis.id,
              name,
              metricIds: Object.entries(metricIds)
                .filter(([id, selected]) => selected)
                .map(([id]) => id),
            },
          });

          if (errors) {
            console.error(errors);
            return;
          }

          history.push('/analyses');
        })}
        as="form"
      >
        <Heading>{analysis.name} - Edit</Heading>
        <FormControls analysis={analysis} />
        <Flex justifyContent="flex-end" mt="4">
          <Button type="submit">Save</Button>
        </Flex>
      </Page>
    </FormContext>
  );
};
