const functions = require('firebase-functions');
const access = require('./https/access');
const graphql = require('./https/graphql');

// Export functions
exports.access = functions.https.onRequest(access);
exports.graphql = functions.https.onRequest(graphql);
