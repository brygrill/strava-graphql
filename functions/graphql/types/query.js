const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const WeekSummary = require('./week-summary');
const weekSummaryLoader = require('../../controllers/strava-summarize-weeks');

module.exports = new GraphQLObjectType({
  name: 'Query',
  description: 'The Root Query',
  fields: () => ({
    summarizeWeeks: {
      type: new GraphQLList(WeekSummary),
      args: {
        count: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'Weeks to include in summary',
        },
        token: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'Strava access token',
        },
      },
      description: 'Summarize Strava activites by week',
      resolve(_, args, ctx) {
        console.log(ctx);
        return weekSummaryLoader(args.token, args.count).then(data => {
          return data;
        });
      },
    },
  }),
});
