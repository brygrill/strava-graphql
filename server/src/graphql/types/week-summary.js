import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
} from 'graphql';

import moment from 'moment';
import helpers from '../../helpers';

const { formatHoursNum } = helpers;

module.exports = new GraphQLObjectType({
  name: 'WeekSummary',
  description: 'Activity summary for a single week. Monday to Sunday',
  fields: () => ({
    weekOf: {
      type: GraphQLString,
      description: 'Week start in human readable format',
    },
    weekNum: {
      type: GraphQLInt,
      description: 'Week number with 0 being current week',
    },
    totalTimeSec: {
      type: GraphQLInt,
      description: 'Accumulated moving_time for all activities of the week',
    },
    totalSuffer: {
      type: GraphQLInt,
      description:
        'Accumulated suffer_score for all activities of the week. Premium only',
    },
    totalTimeHrs: {
      type: GraphQLFloat,
      description: 'totalTimeSec converted to hours',
      resolve(week) {
        return formatHoursNum(week.totalTimeSec);
      },
    },
    totalTimeHrsStr: {
      type: GraphQLString,
      resolve(week) {
        return moment('1900-01-01 00:00:00')
          .add(week.totalTimeSec, 'seconds')
          .format('HH:mm');
      },
    },
  }),
});
