// Helpers for interacting with Strava data
import moment from 'moment';
import _ from 'lodash';

export const lastXWeeks = x => {
  // x would be 12 for example
  // to get the last 12 including the current week
  // we would only want to subtract the last 11
  return moment()
    .subtract(x - 1, 'weeks')
    .startOf('isoWeek')
    .unix();
};

export const currentWeekStart = moment().startOf('isoWeek');

export const seedWeeks = (weeks) => {
  const range = _.range(weeks).map((item, index) => {
    return {
      weekOf: moment(currentWeekStart)
        .subtract(item, 'week')
        .format('MMM Do'),
      totalTimeSec: 0,
      totalTimeHrs: 0,
      weekNum: index,
    };
  });
  return range.reverse();
};

export const weeksAgoNum = date => {
  const current = moment(currentWeekStart);
  return Math.abs(Math.ceil(current.diff(date, 'weeks', true)));
};

export const weekStartDate = date => {
  return moment(date)
    .startOf('isoWeek')
    .format('MMM Do');
};

export const formatHoursStr = sec => {
  const duration = Number(sec);
  const hrs = Math.floor(duration / 3600);
  const mins = Math.floor((duration % 3600) / 60);
  const minsStr = ('0' + mins).slice(-2);
  return `${hrs}h ${minsStr}m`;
};

export const formatMiles = meters => {
  const miles = meters * 0.000621371192;
  const milesRounded = Math.round(miles * 100) / 100;
  return milesRounded.toString();
};

export const formatHoursNum = sec => {
  const hrs = moment.duration(sec, 'seconds').asHours();
  return Math.round(hrs * 100) / 100;
};
