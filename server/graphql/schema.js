import { GraphQLSchema } from 'graphql';
import query from './types/query';

const schema = new GraphQLSchema({
  query,
});

export default schema;
