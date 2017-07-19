export const stravaOAuthUrl = () => {
  const clientID = process.env.REACT_APP_STRAVA_CLIENTID;
  const URI = 'http://localhost:3000/strava';
  const prompt = 'force';
  const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${URI}&approval_prompt=${prompt}&scope=view_private`;
  return authUrl;
};
