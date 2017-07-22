// @flow
import axios from 'axios';

import { stravaBaseApi } from '../config';

const AFTER = '1494820800';

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
  return axios.all([getAthlete(token), getActivities(token, AFTER)]).then(
    axios.spread((athlete, activities) => {
      return { athlete: athlete.data, activities: activities.data };
    }),
  );
};

export default fetchStrava;
