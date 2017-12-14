import * as admin from 'firebase-admin';
import serviceAccount from './config.json';

const fire = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DB_URL,
});

export default fire;
