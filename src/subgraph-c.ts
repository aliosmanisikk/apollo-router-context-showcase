import { gql } from 'graphql-tag';
import { run } from './common';

// The GraphQL schema
const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.11", import: ["@key", "@shareable", "@interfaceObject"])

  type Media @key(fields: "id") @interfaceObject {
    id: ID!
    extraField: String!
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Media: { extraField: () => 'Extra Field' },
};

export const runC = () => run(typeDefs, resolvers, 3003, 'SubgraphC');
