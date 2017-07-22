// @flow
import axios from 'axios';
import moment from 'moment';

import { stravaBaseApi } from '../config';

const lastTenWeeks = moment().subtract(9, 'weeks').startOf('isoWeek').unix();

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
  return axios
    .all([getAthlete(token), getActivities(token, lastTenWeeks)])
    .then(
      axios.spread((athlete, activities) => {
        return { athlete: athlete.data, activities: activities.data };
      }),
    );
};

export default fetchStrava;
