const { GraphQLObjectType } = require('graphql');

const DashType = require('./dash');
const StravaType = require('./strava');

module.exports = new GraphQLObjectType({
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
