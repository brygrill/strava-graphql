import firebase from 'firebase';

// Init firebase connection
export const fire = firebase.initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DBURL,
});

// App title
export const appTitle = 'Strava Dashboard';

// Base url for strava API requests
export const stravaBaseApi = 'https://www.strava.com/api/v3';

// Connect with Strava OAuth url
const clientID = process.env.REACT_APP_STRAVA_CLIENTID;
const URI =
  process.env.NODE_ENV === 'production'
    ? 'https://stravadash.now.sh/strava'
    : 'http://localhost:3000/strava';
const prompt = 'force';
export const stravaOAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${String(
  clientID,
)}&response_type=code&redirect_uri=${URI}&approval_prompt=${
  prompt
}&scope=view_private`;

// Firebase function to gen strava access token
// and save to user in realtime db
export const functionsAccess =
  'https://us-central1-velox-f43d6.cloudfunctions.net/access/';

export const functionsGraphqlProd = 'https://us-central1-velox-f43d6.cloudfunctions.net/graphql/';

export const functionsGraphql = 'http://localhost:5000/velox-f43d6/us-central1/graphql/';

export const graphql = 'http://localhost:3001/graphql';
