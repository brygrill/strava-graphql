import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import WeekSummary from './week-summary';
import weekSummaryLoader from '../../controllers/strava-summarize-weeks';

export default new GraphQLObjectType({
  name: 'StravaType',
  description: 'Strava data for user',
  fields: () => ({
    athlete: {
      type: GraphQLString,
      description: 'Strava athlete user data',
      resolve() {
        return 'Athlete data will be nested under here';
      },
    },
    activity: {
      description: 'Strava athlete activity data',
      type: new GraphQLObjectType({
        name: 'StravaActivityType',
        fields: () => ({
          single_activity: {
            type: GraphQLString,
            description: 'Data for a single activity',
            args: {
              id: {
                type: new GraphQLNonNull(GraphQLInt),
                description: 'Activity id',
              },
            },
            resolve() {
              return 'Single activity data will be returned here';
            },
          },
          week_summary: {
            type: new GraphQLList(WeekSummary),
            description: 'Activity data summarized by week',
            args: {
              count: {
                type: new GraphQLNonNull(GraphQLInt),
                description: 'Weeks to include in summary',
              },
            },
            resolve: async (_, args, ctx) => {
              const data = await weekSummaryLoader(ctx.strava_token, args.count);
              return data;
            },
          },
        }),
      }),
      resolve(_, args, ctx) {
        return { _, args, ctx };
      },
    },
  }),
});
