import { gql } from 'graphql-tag';
import { run } from './common';

// The GraphQL schema
const typeDefs = gql`
  extend schema
    @link(
      url: "https://specs.apollo.dev/federation/v2.11"
      import: ["@key", "@shareable", "@interfaceObject", "@requiresScopes", "@policy", "@external", "@provides"]
    )

  type Media @key(fields: "id", resolvable: false) @interfaceObject {
    id: ID!
  }

  extend type Query {
    medias: [Media!]!
    media(id: String!): Media!
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    medias: () => [{ id: '1' }, { id: '2' }, { id: '3' }],
    media: (_: unknown, { id }: { id: string }) => ({ id }),
  },
};

export const runB = () => run(typeDefs, resolvers, 3002, 'SubgraphB');
