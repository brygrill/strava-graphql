import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'DashType',
  description: 'Data for Dash user',
  fields: () => ({
    uid: {
      type: GraphQLString,
      description: 'Firebase user id',
      resolve(_, args, ctx) {
        return ctx.uid;
      },
    },
    strava_token: {
      type: GraphQLString,
      description: 'Strava access token',
      resolve(_, args, ctx) {
        return ctx.strava_token;
      },
    },
  }),
});
