import firebase from './init';

export const rootRef = firebase.database().ref();
export const schedulesRef = firebase.database().ref('schedules');
