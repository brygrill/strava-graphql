// @flow
import axios from 'axios';
import moment from 'moment';

import { stravaBaseApi } from '../config';
import sorted from './sorted';

// Global Consts
// used to calc unix time for strava get request
const LASTTEN = moment().subtract(9, 'weeks').startOf('isoWeek').unix();

// used to get data for current week
const CURRENTSTART = moment().startOf('isoWeek');

// FORMAT STRAVA DATA
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
          return sorted[determineWeek(weeksAgoRounded)].all.push(item);
        } else if (weeksAgoRounded <= 0) {
          return sorted.current.all.push(item);
        }
        return null;
      });
      resolve(sorted);
    } catch (error) {
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
    return stravaData;
  } catch (err) {
    return {
      error: true,
      msg: err,
    };
  }
};

export default fetchAndFormatStrava;
