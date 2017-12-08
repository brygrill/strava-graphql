# Dash
[![Build Status](https://travis-ci.org/brygrill/dash.svg?branch=master)](https://travis-ci.org/brygrill/dash) 

Some visualizations for your Strava data 🏊 🚴 🏃 💪

### Built With:
- React
- GraphQL
- Apollo
- Firebase
- Firebase Functions

### Setup:
- Auth via Firebase email/pwd
- Strava access via OAuth (`/functions/https/access.js`)
  - upon user confirmation Strava access code sent to Firebase Function which requests an `access_token` from Strava. Token saved to Firebase under user object and used for subsequent requests to Strava
- Strava data via GraphQL (`/functions/https/graphql.js`)
  - data is requested, parsed and formatted via a GraphQL server hosted as a Firebase Function.
- React Components (`/app/src/components`)
  - hocs: Apollo higher-order components for managing GraphQL data
  - pages: components rendered by router
  - router: React-Router components 
