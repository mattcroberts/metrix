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

export type Analysis = {
   __typename?: 'Analysis';
  id: Scalars['ID'];
  name: Scalars['String'];
  chartType: Array<ChartType>;
  metrics: Array<Metric>;
};

export enum ChartType {
  Marker = 'MARKER',
  Line = 'LINE'
}

export type DataPoint = IDataPoint & {
   __typename?: 'DataPoint';
  id: Scalars['ID'];
  metric: Metric;
  datetime: Scalars['DateTime'];
};

export type DataPointInput = {
  rating?: Maybe<Scalars['Float']>;
};

export type DataPointUnion = DataPoint | RatingDataPoint;


export type DeviceRegistration = {
   __typename?: 'DeviceRegistration';
  id: Scalars['String'];
  user: User;
  token: Scalars['String'];
};

export type IDataPoint = {
  id: Scalars['ID'];
  metric: Metric;
  datetime: Scalars['DateTime'];
};

export type Metric = {
   __typename?: 'Metric';
  id: Scalars['ID'];
  name: Scalars['String'];
  datetime: Scalars['DateTime'];
  dataPoints: Array<DataPointUnion>;
  type: MetricType;
  analyses: Array<Analysis>;
  reminder: Scalars['Boolean'];
  reminderUnit?: Maybe<ReminderUnit>;
  reminderValue?: Maybe<Scalars['Float']>;
};

export type MetricInput = {
  name: Scalars['String'];
  reminder: Scalars['Boolean'];
  reminderUnit?: Maybe<ReminderUnit>;
  reminderValue?: Maybe<Scalars['Float']>;
};

export enum MetricType {
  DataPoint = 'DataPoint',
  RatingDataPoint = 'RatingDataPoint'
}

export type Mutation = {
   __typename?: 'Mutation';
  createAnalysis: Analysis;
  recordDataPoint: Metric;
  createMetric: Metric;
  updateMetric: Metric;
  deleteMetric?: Maybe<Metric>;
  unregisterDevice?: Maybe<Scalars['Boolean']>;
};


export type MutationCreateAnalysisArgs = {
  metricIds: Array<Scalars['ID']>;
  name: Scalars['String'];
};


export type MutationRecordDataPointArgs = {
  data?: Maybe<DataPointInput>;
  metricId: Scalars['String'];
};


export type MutationCreateMetricArgs = {
  type?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationUpdateMetricArgs = {
  metricInput: MetricInput;
  id: Scalars['String'];
};


export type MutationDeleteMetricArgs = {
  id: Scalars['String'];
};


export type MutationUnregisterDeviceArgs = {
  id: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  allAnalyses: Array<Analysis>;
  getAnalysisWithData: Analysis;
  allMetrics: Array<Metric>;
  metricById: Metric;
  devices: Array<DeviceRegistration>;
};


export type QueryGetAnalysisWithDataArgs = {
  id: Scalars['String'];
};


export type QueryMetricByIdArgs = {
  id: Scalars['String'];
};

export type RatingDataPoint = IDataPoint & {
   __typename?: 'RatingDataPoint';
  id: Scalars['ID'];
  metric: Metric;
  datetime: Scalars['DateTime'];
  rating: Scalars['Float'];
};

export enum ReminderUnit {
  Day = 'Day',
  Hour = 'Hour',
  Minute = 'Minute'
}

export type User = {
   __typename?: 'User';
  /**
   * The `ID` scalar type represents a unique identifier, often used to refetch an
   * object or as key for a cache. The ID type appears in a JSON response as a
   * String; however, it is not intended to be human-readable. When expected as an
   * input type, any string (such as `"4"`) or integer (such as `4`) input value
   * will be accepted as an ID.
   */
  ID: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  devices: Array<DeviceRegistration>;
};

export type CreateAnalysisMutationVariables = {
  name: Scalars['String'];
  metricIds: Array<Scalars['ID']>;
};


export type CreateAnalysisMutation = (
  { __typename?: 'Mutation' }
  & { createAnalysis: (
    { __typename?: 'Analysis' }
    & Pick<Analysis, 'id' | 'name'>
    & { metrics: Array<(
      { __typename?: 'Metric' }
      & Pick<Metric, 'id'>
    )> }
  ) }
);

export type GetAllAnalysesQueryVariables = {};


export type GetAllAnalysesQuery = (
  { __typename?: 'Query' }
  & { allAnalyses: Array<(
    { __typename?: 'Analysis' }
    & Pick<Analysis, 'id' | 'name'>
    & { metrics: Array<(
      { __typename?: 'Metric' }
      & Pick<Metric, 'name'>
    )> }
  )> }
);

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
    ) | (
      { __typename?: 'RatingDataPoint' }
      & Pick<RatingDataPoint, 'id' | 'datetime'>
    )> }
  ) }
);

export type GetAnalysisWithDataQueryVariables = {
  id: Scalars['String'];
};


export type GetAnalysisWithDataQuery = (
  { __typename?: 'Query' }
  & { getAnalysisWithData: (
    { __typename?: 'Analysis' }
    & Pick<Analysis, 'id' | 'name'>
    & { metrics: Array<(
      { __typename?: 'Metric' }
      & Pick<Metric, 'id' | 'name' | 'type'>
      & { dataPoints: Array<(
        { __typename?: 'DataPoint' }
        & Pick<DataPoint, 'id' | 'datetime'>
      ) | (
        { __typename?: 'RatingDataPoint' }
        & Pick<RatingDataPoint, 'id' | 'datetime' | 'rating'>
      )> }
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
    & Pick<Metric, 'id' | 'name' | 'type'>
  )> }
);

export type RecordDataPointMutationVariables = {
  metricId: Scalars['String'];
  data: DataPointInput;
};


export type RecordDataPointMutation = (
  { __typename?: 'Mutation' }
  & { recordDataPoint: (
    { __typename?: 'Metric' }
    & Pick<Metric, 'id' | 'name'>
    & { dataPoints: Array<(
      { __typename?: 'DataPoint' }
      & Pick<DataPoint, 'id' | 'datetime'>
    ) | (
      { __typename?: 'RatingDataPoint' }
      & Pick<RatingDataPoint, 'id' | 'datetime'>
    )> }
  ) }
);

export type CreateMetricMutationVariables = {
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};


export type CreateMetricMutation = (
  { __typename?: 'Mutation' }
  & { createMetric: (
    { __typename?: 'Metric' }
    & Pick<Metric, 'id' | 'name' | 'type'>
  ) }
);

export type GetMetricByIdQueryVariables = {
  id: Scalars['String'];
};


export type GetMetricByIdQuery = (
  { __typename?: 'Query' }
  & { metricById: (
    { __typename?: 'Metric' }
    & Pick<Metric, 'id' | 'name' | 'type' | 'reminder' | 'reminderUnit' | 'reminderValue'>
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

export type GetNotifcationConfigQueryVariables = {};


export type GetNotifcationConfigQuery = (
  { __typename?: 'Query' }
  & { devices: Array<(
    { __typename?: 'DeviceRegistration' }
    & Pick<DeviceRegistration, 'id' | 'token'>
  )> }
);

export type UnregisterDeviceMutationVariables = {
  id: Scalars['String'];
};


export type UnregisterDeviceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'unregisterDevice'>
);


export const CreateAnalysisDocument = gql`
    mutation CreateAnalysis($name: String!, $metricIds: [ID!]!) {
  createAnalysis(name: $name, metricIds: $metricIds) {
    id
    name
    metrics {
      id
    }
  }
}
    `;
export type CreateAnalysisMutationFn = ApolloReactCommon.MutationFunction<CreateAnalysisMutation, CreateAnalysisMutationVariables>;

/**
 * __useCreateAnalysisMutation__
 *
 * To run a mutation, you first call `useCreateAnalysisMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAnalysisMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAnalysisMutation, { data, loading, error }] = useCreateAnalysisMutation({
 *   variables: {
 *      name: // value for 'name'
 *      metricIds: // value for 'metricIds'
 *   },
 * });
 */
export function useCreateAnalysisMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAnalysisMutation, CreateAnalysisMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateAnalysisMutation, CreateAnalysisMutationVariables>(CreateAnalysisDocument, baseOptions);
      }
export type CreateAnalysisMutationHookResult = ReturnType<typeof useCreateAnalysisMutation>;
export type CreateAnalysisMutationResult = ApolloReactCommon.MutationResult<CreateAnalysisMutation>;
export type CreateAnalysisMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateAnalysisMutation, CreateAnalysisMutationVariables>;
export const GetAllAnalysesDocument = gql`
    query GetAllAnalyses {
  allAnalyses {
    id
    name
    metrics {
      name
    }
  }
}
    `;

/**
 * __useGetAllAnalysesQuery__
 *
 * To run a query within a React component, call `useGetAllAnalysesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAnalysesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAnalysesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAnalysesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllAnalysesQuery, GetAllAnalysesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAllAnalysesQuery, GetAllAnalysesQueryVariables>(GetAllAnalysesDocument, baseOptions);
      }
export function useGetAllAnalysesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllAnalysesQuery, GetAllAnalysesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAllAnalysesQuery, GetAllAnalysesQueryVariables>(GetAllAnalysesDocument, baseOptions);
        }
export type GetAllAnalysesQueryHookResult = ReturnType<typeof useGetAllAnalysesQuery>;
export type GetAllAnalysesLazyQueryHookResult = ReturnType<typeof useGetAllAnalysesLazyQuery>;
export type GetAllAnalysesQueryResult = ApolloReactCommon.QueryResult<GetAllAnalysesQuery, GetAllAnalysesQueryVariables>;
export const GetMetricWithDataPointsDocument = gql`
    query GetMetricWithDataPoints($metricId: String!) {
  metricById(id: $metricId) {
    id
    name
    dataPoints {
      ... on IDataPoint {
        id
        datetime
      }
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
export const GetAnalysisWithDataDocument = gql`
    query GetAnalysisWithData($id: String!) {
  getAnalysisWithData(id: $id) {
    id
    name
    metrics {
      id
      name
      type
      dataPoints {
        ... on IDataPoint {
          id
          datetime
        }
        ... on RatingDataPoint {
          rating
        }
      }
    }
  }
}
    `;

/**
 * __useGetAnalysisWithDataQuery__
 *
 * To run a query within a React component, call `useGetAnalysisWithDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAnalysisWithDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAnalysisWithDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAnalysisWithDataQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAnalysisWithDataQuery, GetAnalysisWithDataQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAnalysisWithDataQuery, GetAnalysisWithDataQueryVariables>(GetAnalysisWithDataDocument, baseOptions);
      }
export function useGetAnalysisWithDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAnalysisWithDataQuery, GetAnalysisWithDataQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAnalysisWithDataQuery, GetAnalysisWithDataQueryVariables>(GetAnalysisWithDataDocument, baseOptions);
        }
export type GetAnalysisWithDataQueryHookResult = ReturnType<typeof useGetAnalysisWithDataQuery>;
export type GetAnalysisWithDataLazyQueryHookResult = ReturnType<typeof useGetAnalysisWithDataLazyQuery>;
export type GetAnalysisWithDataQueryResult = ApolloReactCommon.QueryResult<GetAnalysisWithDataQuery, GetAnalysisWithDataQueryVariables>;
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
    type
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
export const RecordDataPointDocument = gql`
    mutation recordDataPoint($metricId: String!, $data: DataPointInput!) {
  recordDataPoint(metricId: $metricId, data: $data) {
    id
    name
    dataPoints {
      ... on IDataPoint {
        id
        datetime
      }
    }
  }
}
    `;
export type RecordDataPointMutationFn = ApolloReactCommon.MutationFunction<RecordDataPointMutation, RecordDataPointMutationVariables>;

/**
 * __useRecordDataPointMutation__
 *
 * To run a mutation, you first call `useRecordDataPointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecordDataPointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recordDataPointMutation, { data, loading, error }] = useRecordDataPointMutation({
 *   variables: {
 *      metricId: // value for 'metricId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRecordDataPointMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RecordDataPointMutation, RecordDataPointMutationVariables>) {
        return ApolloReactHooks.useMutation<RecordDataPointMutation, RecordDataPointMutationVariables>(RecordDataPointDocument, baseOptions);
      }
export type RecordDataPointMutationHookResult = ReturnType<typeof useRecordDataPointMutation>;
export type RecordDataPointMutationResult = ApolloReactCommon.MutationResult<RecordDataPointMutation>;
export type RecordDataPointMutationOptions = ApolloReactCommon.BaseMutationOptions<RecordDataPointMutation, RecordDataPointMutationVariables>;
export const CreateMetricDocument = gql`
    mutation CreateMetric($name: String!, $type: String) {
  createMetric(name: $name, type: $type) {
    id
    name
    type
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
 *      type: // value for 'type'
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
    type
    reminder
    reminderUnit
    reminderValue
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
export const GetNotifcationConfigDocument = gql`
    query GetNotifcationConfig {
  devices {
    id
    token
  }
}
    `;

/**
 * __useGetNotifcationConfigQuery__
 *
 * To run a query within a React component, call `useGetNotifcationConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotifcationConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotifcationConfigQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNotifcationConfigQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetNotifcationConfigQuery, GetNotifcationConfigQueryVariables>) {
        return ApolloReactHooks.useQuery<GetNotifcationConfigQuery, GetNotifcationConfigQueryVariables>(GetNotifcationConfigDocument, baseOptions);
      }
export function useGetNotifcationConfigLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetNotifcationConfigQuery, GetNotifcationConfigQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetNotifcationConfigQuery, GetNotifcationConfigQueryVariables>(GetNotifcationConfigDocument, baseOptions);
        }
export type GetNotifcationConfigQueryHookResult = ReturnType<typeof useGetNotifcationConfigQuery>;
export type GetNotifcationConfigLazyQueryHookResult = ReturnType<typeof useGetNotifcationConfigLazyQuery>;
export type GetNotifcationConfigQueryResult = ApolloReactCommon.QueryResult<GetNotifcationConfigQuery, GetNotifcationConfigQueryVariables>;
export const UnregisterDeviceDocument = gql`
    mutation UnregisterDevice($id: String!) {
  unregisterDevice(id: $id)
}
    `;
export type UnregisterDeviceMutationFn = ApolloReactCommon.MutationFunction<UnregisterDeviceMutation, UnregisterDeviceMutationVariables>;

/**
 * __useUnregisterDeviceMutation__
 *
 * To run a mutation, you first call `useUnregisterDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnregisterDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unregisterDeviceMutation, { data, loading, error }] = useUnregisterDeviceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnregisterDeviceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnregisterDeviceMutation, UnregisterDeviceMutationVariables>) {
        return ApolloReactHooks.useMutation<UnregisterDeviceMutation, UnregisterDeviceMutationVariables>(UnregisterDeviceDocument, baseOptions);
      }
export type UnregisterDeviceMutationHookResult = ReturnType<typeof useUnregisterDeviceMutation>;
export type UnregisterDeviceMutationResult = ApolloReactCommon.MutationResult<UnregisterDeviceMutation>;
export type UnregisterDeviceMutationOptions = ApolloReactCommon.BaseMutationOptions<UnregisterDeviceMutation, UnregisterDeviceMutationVariables>;