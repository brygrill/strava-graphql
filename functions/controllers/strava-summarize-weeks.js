const axios = require('axios');
const _ = require('lodash');

const helpers = require('../helpers');

const { lastXWeeks, seedWeeks, weekStartDate } = helpers;

const instance = axios.create({
  baseURL: 'https://www.strava.com/api/v3',
  timeout: 5000,
});

const getActivities = (token, after) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const endpoint = `/athlete/activities?after=${after}&per_page=200`;
  return instance.get(endpoint, config);
};

module.exports = (token, count) => {
  // get athlete activities
  return getActivities(token, lastXWeeks(count))
    .then(({ data }) => {
      const weeks = seedWeeks(count);
      data.map(item => {
        // Find the week the activity is in
        // add activity time to total hours
        const weekStart = weekStartDate(item.start_date);
        const weekOfTheActivity = _.find(weeks, { weekOf: weekStart });
        if (weekOfTheActivity) {
          // accumulate activity time
          weekOfTheActivity.totalTimeSec += item.moving_time;
          weekOfTheActivity.totalSuffer += item.suffer_score;
        }
        return item;
      });
      return weeks;
    })
    .catch(err => {
      return err;
    });
};
