// Get Strava data, Format and return
import _ from 'lodash';
import { getActivities } from './fetch';
import {
  seedWeeks,
  lastXWeeks,
  weeksAgoNum,
  weekStartDate,
  formatHoursNum,
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

export const hrsByWeek = async token => {
  // get athlete activities
  const activites = await getActivities(token, lastXWeeks(12));
  // organize by last 12 weeks
  const weeks = seedWeeks();
  activites.data.map(item => {
    // Get the object for the activities week
    const weekNum = weeksAgoNum(item.start_date);
    const weekStart = weekStartDate(item.start_date);
    const weekInWeeks = _.find(weeks, { weekOf: weekStart });
    // accumulate activity time
    weekInWeeks.totalTimeSec += item.moving_time;
    const newTotal = weekInWeeks.totalTimeSec + item.moving_time;
    // return new week object
    return _.assign({}, weekInWeeks, {
      totalTimeSec: newTotal,
      weekNum,
    });
  });

  // // calc total hours per week
  // weeks.map(item => {

  // })

  console.log(weeks);

  // console.log(item.start_date);
  return activites.data;
};
