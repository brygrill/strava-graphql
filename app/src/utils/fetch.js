import axios from 'axios';

import { functionsAccess, stravaBaseApi } from '../config';

// Fire Function to save Strava OAuth token
export const saveToken = (code, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios
    .post(functionsAccess, { code }, config)
    .then(resp => {
      return resp.data;
    })
    .catch(() => {
      return false;
    });
};

// Strava API
// Init Strava
const instance = axios.create({
  baseURL: stravaBaseApi,
  timeout: 5000,
});

// Get athlete profile
export const getAthlete = token => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return instance.get('/athlete', config);
};

// Get activities since X
export const getActivities = (token, after) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return instance.get(
    `/athlete/activities?after=${after}&per_page=200`,
    config,
  );
};

// Get athlete and activities
export const fetchAthleteData = (token, after) => {
  return axios.all([getAthlete(token), getActivities(token, after)]).then(
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
