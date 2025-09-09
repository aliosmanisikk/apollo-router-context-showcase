import { gql } from 'graphql-tag';
import { run } from './common';

// The GraphQL schema
const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.11", import: ["@key", "@shareable"])

  type Cart @key(fields: "id") @shareable {
    id: ID!
    deliveryMethod: String!
    lineItems: [LineItem!]!
  }

  type LineItem @key(fields: "id") {
    id: ID!
    productType: String!
    quantity: Int!
  }

  extend type Query {
    currentCart: Cart!
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    currentCart: () => ({
      id: '1',
      deliveryMethod: 'home-delivery',
      lineItems: [
        { id: '1', productType: 'Sunglass', quantity: 2 },
        { id: '2', productType: 'Frame', quantity: 1 },
      ],
    }),
  },
  Cart: {
    __resolveReference: (cart: { id: string }) => {
      if (cart.id === 'old') {
        return {
          id: cart.id,
          deliveryMethod: 'pick-up',
          lineItems: [{ id: '1', productType: 'Product old', quantity: 1 }],
        };
      }
      return {
        id: cart.id,
        deliveryMethod: 'home-delivery',
        lineItems: [
          { id: '1', productType: 'Product 1', quantity: 2 },
          { id: '2', productType: 'Product 2', quantity: 1 },
        ],
      };
    },
  },
  LineItem: {
    __resolveReference: (lineItem: { id: string }) => ({
      id: lineItem.id,
      productType: `Product ${lineItem.id}`,
      quantity: lineItem.id === '1' ? 2 : 1,
    }),
  },
};

export const runB = () => run(typeDefs, resolvers, 3002, 'SubgraphB');
