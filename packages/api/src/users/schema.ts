import { gql } from 'apollo-server';

export const UserSchema = gql`
  type User {
    id: ID!
  }

  extend type Query {
    User: User
  }
`;
