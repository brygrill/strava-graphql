// @flow
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

import { stravaBaseApi } from '../config';
import sorted from './sorted';

// Global Consts
// used to calc unix time for strava get request
const LASTTEN = moment().subtract(9, 'weeks').startOf('isoWeek').unix();

// used to get data for current week
const CURRENTSTART = moment().startOf('isoWeek');

// FORMAT STRAVA DATA
const formatHoursStr = sec => {
  const duration = Number(sec);
  const hrs = Math.floor(duration / 3600);
  const mins = Math.floor(duration % 3600 / 60);
  const minsStr = ('0' + mins).slice(-2);
  return `${hrs}h ${minsStr}m`;
};

const formatHoursNum = sec => {
  const hrs = moment.duration(sec, 'seconds').asHours();
  return Math.round(hrs * 100) / 100;
};

const formatWeekStart = (date, human) => {
  return human
    ? moment(date).startOf('isoweek').format('MM/DD/YY')
    : moment(date).startOf('isoweek').format('YYYY-MM-DD');
};

// deteremine week object
const determineWeek = num => {
  switch (num) {
    case 1:
      return 'week1';
    case 2:
      return 'week2';
    case 3:
      return 'week3';
    case 4:
      return 'week4';
    case 5:
      return 'week5';
    case 6:
      return 'week6';
    case 7:
      return 'week7';
    case 8:
      return 'week8';
    case 9:
      return 'week9';
    default:
      return 'overflow';
  }
};

// sort by week
const sortWeeks = data => {
  return new Promise((resolve, reject) => {
    try {
      data.map(item => {
        // API call will get data for last 10 weeks
        // Current week will be negative number relative to currentstart
        // Other weeks will be positive 1-9
        const workoutDate = moment(item.start_date_local);
        const weeksAgo = CURRENTSTART.diff(workoutDate, 'weeks', true);
        const weeksAgoRounded = Math.ceil(weeksAgo);
        if (weeksAgoRounded > 0 && weeksAgoRounded < 10) {
          sorted[
            determineWeek(weeksAgoRounded)
          ].weekStartHuman = formatWeekStart(workoutDate, true);
          sorted[determineWeek(weeksAgoRounded)].weekStart = formatWeekStart(
            workoutDate,
            false,
          );
          return sorted[determineWeek(weeksAgoRounded)].all.push(item);
        } else if (weeksAgoRounded <= 0) {
          sorted.current.weekStartHuman = formatWeekStart(workoutDate, true);
          sorted.current.weekStart = formatWeekStart(workoutDate, false);
          return sorted.current.all.push(item);
        }
        return null;
      });
      resolve(sorted);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const sumWeekData = weekData => {
  return new Promise((resolve, reject) => {
    try {
      _.mapKeys(weekData, (value, key) => {
        let totalSuffer = 0;
        let totalSeconds = 0;
        let hoursBySport = {
          swim: {
            seconds: 0,
            hoursTotal: 0,
            hoursTotalHuman: null,
          },
          bike: {
            seconds: 0,
            hoursTotal: 0,
            hoursTotalHuman: null,
          },
          run: {
            seconds: 0,
            hoursTotal: 0,
            hoursTotalHuman: null,
          },
          strength: {
            seconds: 0,
            hoursTotal: 0,
            hoursTotalHuman: null,
          },
        };
        weekData[key].all.map(workout => {
          if (workout.suffer_score) totalSuffer += workout.suffer_score;
          if (workout.moving_time) totalSeconds += workout.moving_time;
          switch (workout.type) {
            case 'Run':
              hoursBySport.run.seconds += workout.moving_time;
              break;
            case 'Ride':
              hoursBySport.bike.seconds += workout.moving_time;
              break;
            case 'Swim':
              hoursBySport.swim.seconds += workout.moving_time;
              break;
            case 'Crossfit':
            case 'WeightTraining':
              hoursBySport.strength.seconds += workout.moving_time;
              break;
            default:
              break;
          }
          return null;
        });
        // Set total suffer score
        weekData[key].sufferTotal = totalSuffer;
        // Set and format total hours
        weekData[key].hoursTotalHuman = formatHoursStr(totalSeconds);
        weekData[key].hoursTotal = formatHoursNum(totalSeconds);
        // Set and format hours by sport
        _.mapKeys(hoursBySport, (sportVal, sportKey) => {
          const sport = hoursBySport[sportKey];
          sport.hoursTotalHuman = formatHoursStr(sport.seconds);
          sport.hoursTotal = formatHoursNum(sport.seconds);
        });
        weekData[key].hoursBySport = hoursBySport;
        return { totalSuffer, totalSeconds, hoursBySport };
      });
      resolve(weekData);
    } catch (error) {
      reject(error);
    }
  });
};

const formatWeekSummary = data => {
  return new Promise((resolve, reject) => {
    try {
      const sports = data.hoursBySport;
      const formatted = [
        { name: 'Swim', value: sports.swim.hoursTotalHuman },
        { name: 'Bike', value: sports.bike.hoursTotalHuman },
        { name: 'Run', value: sports.run.hoursTotalHuman },
        { name: 'Strength', value: sports.strength.hoursTotalHuman },
        { name: 'Total Hours', value: data.hoursTotalHuman },
        { name: 'Total Suffers', value: data.sufferTotal },
      ];
      resolve(formatted);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

// FETCH STRAVA DATA
const instance = axios.create({
  baseURL: stravaBaseApi,
  timeout: 5000,
});

const getAthlete = token => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return instance.get('/athlete', config);
};

const getActivities = (token, after) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return instance.get(
    `/athlete/activities?after=${after}&per_page=200`,
    config,
  );
};

const fetchStrava = (token: string) => {
  return axios.all([getAthlete(token), getActivities(token, LASTTEN)]).then(
    axios.spread((athlete, activities) => {
      return { athlete: athlete.data, activities: activities.data };
    }),
  );
};

// FORMAT AND RETURN
const fetchAndFormatStrava = async (token: string) => {
  try {
    const stravaData = await fetchStrava(token);
    stravaData.activities = await sortWeeks(stravaData.activities);
    stravaData.activities = await sumWeekData(stravaData.activities);
    stravaData.currentWeekSummary = await formatWeekSummary(
      stravaData.activities.current,
    );

    return stravaData;
  } catch (err) {
    return {
      error: true,
      msg: err,
    };
  }
};

export default fetchAndFormatStrava;
