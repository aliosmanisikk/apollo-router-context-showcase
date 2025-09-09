import { gql } from 'graphql-tag';
import { isDefined, run } from './common';

// The GraphQL schema
const typeDefs = gql`
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.11", import: ["@key", "@context", "@fromContext", "@external", "@shareable"])

  type Cart @key(fields: "id", resolvable: false) @context(name: "cartContext") @shareable {
    id: ID!
    deliveryMethod: String! @external
  }

  type LineItem @key(fields: "id") {
    id: ID!
    deliveryEstimation(deliveryMethod: String @fromContext(field: "$cartContext { deliveryMethod }")): Int!
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  LineItem: {
    deliveryEstimation: (_: unknown, { deliveryMethod }: { deliveryMethod: string }) => {
      if (deliveryMethod === 'home-delivery') {
        return 2;
      }
      return 5;
    },
  },
};

export const runA = () => run(typeDefs, resolvers, 3001, 'SubgraphA');
