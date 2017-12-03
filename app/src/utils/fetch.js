import axios from 'axios';
import moment from 'moment';

import { fireFuncStrava, stravaBaseApi } from '../config';

const LASTTEN = moment()
  .subtract(9, 'weeks')
  .startOf('isoWeek')
  .unix();

// Fire Function to save Strava OAuth token
export const saveToken = (code, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios
    .post(fireFuncStrava, { code }, config)
    .then(resp => {
      console.log(resp);
      return resp.data;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
};

// Strava API
// Get Athlete Data
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

export const fetchAthleteData = token => {
  return axios.all([getAthlete(token), getActivities(token, LASTTEN)]).then(
    axios.spread((athlete, activities) => {
      return { athlete: athlete.data, activities: activities.data };
    }),
  );
};

// Deauth Athlete
export const deAuthAthlete = token => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios.post('https://www.strava.com/oauth/deauthorize', {}, config);
};
