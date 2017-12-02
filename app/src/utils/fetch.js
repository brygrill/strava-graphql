import axios from 'axios';

import { stravaFunctionUrl, stravaBaseApi } from '../config';

// Fire Function to save Strava OAuth token
export const saveToken = (code, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  return axios
    .get(stravaFunctionUrl(code), config)
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

export const fetchStrava = (token: string) => {
  return axios.all([getAthlete(token), getActivities(token, LASTTEN)]).then(
    axios.spread((athlete, activities) => {
      return { athlete: athlete.data, activities: activities.data };
    }),
  );
};

export default saveToken;
