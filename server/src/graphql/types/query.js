import { GraphQLObjectType } from 'graphql';
import DashType from './dash';
import StravaType from './strava';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The Root Query',
  fields: () => ({
    dash: {
      description: 'Top level Dash user data',
      type: DashType,
      resolve(_, args, ctx) {
        return { _, args, ctx };
      },
    },
    strava: {
      description: 'Top level Strava user data',
      type: StravaType,
      resolve(_, args, ctx) {
        return { _, args, ctx };
      },
    },
  }),
});
