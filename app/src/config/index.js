import firebase from 'firebase';

export const appTitle = 'SBR Training';

export const fire = firebase.initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DBURL,
});

export const stravaBaseApi = 'https://www.strava.com/api/v3';

// Connect with Strava url
const clientID = process.env.REACT_APP_STRAVA_CLIENTID;
const URI = 'http://localhost:3000/strava';
const prompt = 'force';
export const stravaOAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${String(clientID)}&response_type=code&redirect_uri=${URI}&approval_prompt=${prompt}&scope=view_private`;

export const stravaFunctionUrl = (code) => {
  return `https://us-central1-velox-f43d6.cloudfunctions.net/strava/token?code=${code}`;
};

export const allowedFunctionUrl = (phone) => {
  return `https://us-central1-velox-f43d6.cloudfunctions.net/allowed?num=${phone}`;
};
