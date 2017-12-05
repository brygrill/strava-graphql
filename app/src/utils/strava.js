// Get Strava data, Format and return
import _ from 'lodash';
import { getActivities } from './fetch';
import {
  seedWeeks,
  lastXWeeks,
  weekStartDate,
} from '../helpers';

export const fourWeekSMA = data => {
  return new Promise((resolve, reject) => {
    try {
      // calc 4 week simple moving avg here
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const last12Weeks = async token => {
  // get athlete activities
  const activites = await getActivities(token, lastXWeeks(12));
  // organize by last 12 weeks
  const weeks = seedWeeks(12);
  activites.data.map(item => {
    // Find the week the activity is in
    // add activity time to total hours
    const weekStart = weekStartDate(item.start_date);
    const weekOfTheActivity = _.find(weeks, { weekOf: weekStart });
    if (weekOfTheActivity) {
      // accumulate activity time
      weekOfTheActivity.totalTimeSec += item.moving_time;
    }

    return item;
  });

  return weeks;
};
