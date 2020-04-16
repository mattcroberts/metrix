import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type DataPoint = {
   __typename?: 'DataPoint';
  id: Scalars['ID'];
  datetime: Scalars['DateTime'];
  metric: Metric;
};


export type Metric = {
   __typename?: 'Metric';
  id: Scalars['ID'];
  name: Scalars['String'];
  datetime: Scalars['DateTime'];
  dataPoints: Array<DataPoint>;
};

export type MetricInput = {
  name: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createMetric: Metric;
  updateMetric: Metric;
  recordMetric: Metric;
  deleteMetric?: Maybe<Metric>;
};


export type MutationCreateMetricArgs = {
  name: Scalars['String'];
};


export type MutationUpdateMetricArgs = {
  metricInput: MetricInput;
  id: Scalars['String'];
};


export type MutationRecordMetricArgs = {
  metricId: Scalars['String'];
};


export type MutationDeleteMetricArgs = {
  id: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  allMetrics: Array<Metric>;
  metricById: Metric;
};


export type QueryMetricByIdArgs = {
  id: Scalars['String'];
};

export type GetMetricWithDataPointsQueryVariables = {
  metricId: Scalars['String'];
};


export type GetMetricWithDataPointsQuery = (
  { __typename?: 'Query' }
  & { metricById: (
    { __typename?: 'Metric' }
    & Pick<Metric, 'id' | 'name'>
    & { dataPoints: Array<(
      { __typename?: 'DataPoint' }
      & Pick<DataPoint, 'id' | 'datetime'>
    )> }
  ) }
);

export type DeleteMetricMutationVariables = {
  id: Scalars['String'];
};


export type DeleteMetricMutation = (
  { __typename?: 'Mutation' }
  & { deleteMetric?: Maybe<(
    { __typename?: 'Metric' }
    & Pick<Metric, 'id'>
  )> }
);

export type GetAllMetricsQueryVariables = {};


export type GetAllMetricsQuery = (
  { __typename?: 'Query' }
  & { allMetrics: Array<(
    { __typename?: 'Metric' }
    & Pick<Metric, 'id' | 'name'>
  )> }
);

export type RecordMetricMutationVariables = {
  metricId: Scalars['String'];
};


export type RecordMetricMutation = (
  { __typename?: 'Mutation' }
  & { recordMetric: (
    { __typename?: 'Metric' }
    & Pick<Metric, 'id' | 'name'>
    & { dataPoints: Array<(
      { __typename?: 'DataPoint' }
      & Pick<DataPoint, 'id' | 'datetime'>
    )> }
  ) }
);

export type CreateMetricMutationVariables = {
  name: Scalars['String'];
};


export type CreateMetricMutation = (
  { __typename?: 'Mutation' }
  & { createMetric: (
    { __typename?: 'Metric' }
    & Pick<Metric, 'id' | 'name'>
  ) }
);

export type GetMetricByIdQueryVariables = {
  id: Scalars['String'];
};


export type GetMetricByIdQuery = (
  { __typename?: 'Query' }
  & { metricById: (
    { __typename?: 'Metric' }
    & Pick<Metric, 'id' | 'name'>
  ) }
);

export type UpdateMetricMutationVariables = {
  id: Scalars['String'];
  metricInput: MetricInput;
};


export type UpdateMetricMutation = (
  { __typename?: 'Mutation' }
  & { updateMetric: (
    { __typename?: 'Metric' }
    & Pick<Metric, 'id' | 'name'>
  ) }
);


export const GetMetricWithDataPointsDocument = gql`
    query GetMetricWithDataPoints($metricId: String!) {
  metricById(id: $metricId) {
    id
    name
    dataPoints {
      id
      datetime
    }
  }
}
    `;

/**
 * __useGetMetricWithDataPointsQuery__
 *
 * To run a query within a React component, call `useGetMetricWithDataPointsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMetricWithDataPointsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMetricWithDataPointsQuery({
 *   variables: {
 *      metricId: // value for 'metricId'
 *   },
 * });
 */
export function useGetMetricWithDataPointsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMetricWithDataPointsQuery, GetMetricWithDataPointsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMetricWithDataPointsQuery, GetMetricWithDataPointsQueryVariables>(GetMetricWithDataPointsDocument, baseOptions);
      }
export function useGetMetricWithDataPointsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMetricWithDataPointsQuery, GetMetricWithDataPointsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMetricWithDataPointsQuery, GetMetricWithDataPointsQueryVariables>(GetMetricWithDataPointsDocument, baseOptions);
        }
export type GetMetricWithDataPointsQueryHookResult = ReturnType<typeof useGetMetricWithDataPointsQuery>;
export type GetMetricWithDataPointsLazyQueryHookResult = ReturnType<typeof useGetMetricWithDataPointsLazyQuery>;
export type GetMetricWithDataPointsQueryResult = ApolloReactCommon.QueryResult<GetMetricWithDataPointsQuery, GetMetricWithDataPointsQueryVariables>;
export const DeleteMetricDocument = gql`
    mutation deleteMetric($id: String!) {
  deleteMetric(id: $id) {
    id
  }
}
    `;
export type DeleteMetricMutationFn = ApolloReactCommon.MutationFunction<DeleteMetricMutation, DeleteMetricMutationVariables>;

/**
 * __useDeleteMetricMutation__
 *
 * To run a mutation, you first call `useDeleteMetricMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMetricMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMetricMutation, { data, loading, error }] = useDeleteMetricMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMetricMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMetricMutation, DeleteMetricMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteMetricMutation, DeleteMetricMutationVariables>(DeleteMetricDocument, baseOptions);
      }
export type DeleteMetricMutationHookResult = ReturnType<typeof useDeleteMetricMutation>;
export type DeleteMetricMutationResult = ApolloReactCommon.MutationResult<DeleteMetricMutation>;
export type DeleteMetricMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteMetricMutation, DeleteMetricMutationVariables>;
export const GetAllMetricsDocument = gql`
    query getAllMetrics {
  allMetrics {
    id
    name
  }
}
    `;

/**
 * __useGetAllMetricsQuery__
 *
 * To run a query within a React component, call `useGetAllMetricsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMetricsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMetricsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllMetricsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllMetricsQuery, GetAllMetricsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAllMetricsQuery, GetAllMetricsQueryVariables>(GetAllMetricsDocument, baseOptions);
      }
export function useGetAllMetricsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllMetricsQuery, GetAllMetricsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAllMetricsQuery, GetAllMetricsQueryVariables>(GetAllMetricsDocument, baseOptions);
        }
export type GetAllMetricsQueryHookResult = ReturnType<typeof useGetAllMetricsQuery>;
export type GetAllMetricsLazyQueryHookResult = ReturnType<typeof useGetAllMetricsLazyQuery>;
export type GetAllMetricsQueryResult = ApolloReactCommon.QueryResult<GetAllMetricsQuery, GetAllMetricsQueryVariables>;
export const RecordMetricDocument = gql`
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
export type RecordMetricMutationFn = ApolloReactCommon.MutationFunction<RecordMetricMutation, RecordMetricMutationVariables>;

/**
 * __useRecordMetricMutation__
 *
 * To run a mutation, you first call `useRecordMetricMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecordMetricMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recordMetricMutation, { data, loading, error }] = useRecordMetricMutation({
 *   variables: {
 *      metricId: // value for 'metricId'
 *   },
 * });
 */
export function useRecordMetricMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RecordMetricMutation, RecordMetricMutationVariables>) {
        return ApolloReactHooks.useMutation<RecordMetricMutation, RecordMetricMutationVariables>(RecordMetricDocument, baseOptions);
      }
export type RecordMetricMutationHookResult = ReturnType<typeof useRecordMetricMutation>;
export type RecordMetricMutationResult = ApolloReactCommon.MutationResult<RecordMetricMutation>;
export type RecordMetricMutationOptions = ApolloReactCommon.BaseMutationOptions<RecordMetricMutation, RecordMetricMutationVariables>;
export const CreateMetricDocument = gql`
    mutation CreateMetric($name: String!) {
  createMetric(name: $name) {
    id
    name
  }
}
    `;
export type CreateMetricMutationFn = ApolloReactCommon.MutationFunction<CreateMetricMutation, CreateMetricMutationVariables>;

/**
 * __useCreateMetricMutation__
 *
 * To run a mutation, you first call `useCreateMetricMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMetricMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMetricMutation, { data, loading, error }] = useCreateMetricMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateMetricMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateMetricMutation, CreateMetricMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateMetricMutation, CreateMetricMutationVariables>(CreateMetricDocument, baseOptions);
      }
export type CreateMetricMutationHookResult = ReturnType<typeof useCreateMetricMutation>;
export type CreateMetricMutationResult = ApolloReactCommon.MutationResult<CreateMetricMutation>;
export type CreateMetricMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateMetricMutation, CreateMetricMutationVariables>;
export const GetMetricByIdDocument = gql`
    query GetMetricById($id: String!) {
  metricById(id: $id) {
    id
    name
  }
}
    `;

/**
 * __useGetMetricByIdQuery__
 *
 * To run a query within a React component, call `useGetMetricByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMetricByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMetricByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMetricByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMetricByIdQuery, GetMetricByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMetricByIdQuery, GetMetricByIdQueryVariables>(GetMetricByIdDocument, baseOptions);
      }
export function useGetMetricByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMetricByIdQuery, GetMetricByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMetricByIdQuery, GetMetricByIdQueryVariables>(GetMetricByIdDocument, baseOptions);
        }
export type GetMetricByIdQueryHookResult = ReturnType<typeof useGetMetricByIdQuery>;
export type GetMetricByIdLazyQueryHookResult = ReturnType<typeof useGetMetricByIdLazyQuery>;
export type GetMetricByIdQueryResult = ApolloReactCommon.QueryResult<GetMetricByIdQuery, GetMetricByIdQueryVariables>;
export const UpdateMetricDocument = gql`
    mutation UpdateMetric($id: String!, $metricInput: MetricInput!) {
  updateMetric(id: $id, metricInput: $metricInput) {
    id
    name
  }
}
    `;
export type UpdateMetricMutationFn = ApolloReactCommon.MutationFunction<UpdateMetricMutation, UpdateMetricMutationVariables>;

/**
 * __useUpdateMetricMutation__
 *
 * To run a mutation, you first call `useUpdateMetricMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMetricMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMetricMutation, { data, loading, error }] = useUpdateMetricMutation({
 *   variables: {
 *      id: // value for 'id'
 *      metricInput: // value for 'metricInput'
 *   },
 * });
 */
export function useUpdateMetricMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateMetricMutation, UpdateMetricMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateMetricMutation, UpdateMetricMutationVariables>(UpdateMetricDocument, baseOptions);
      }
export type UpdateMetricMutationHookResult = ReturnType<typeof useUpdateMetricMutation>;
export type UpdateMetricMutationResult = ApolloReactCommon.MutationResult<UpdateMetricMutation>;
export type UpdateMetricMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateMetricMutation, UpdateMetricMutationVariables>;