const { GraphQLSchema } = require('graphql');
const query = require('./types/query');

const schema = new GraphQLSchema({
  query,
});

module.exports = schema;
