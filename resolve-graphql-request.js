// Create this as resolve-graphql-request.js in your project root
import { GraphQLClient, gql } from 'graphql-request';
export { GraphQLClient, gql };

// Add any other exports from graphql-request that you need// resolve-graphql-request.js
// Make this a CommonJS file
const graphqlRequest = require('graphql-request');

// Export the specific items you need
module.exports = {
    GraphQLClient: graphqlRequest.GraphQLClient,
    gql: graphqlRequest.gql,
    request: graphqlRequest.request
};