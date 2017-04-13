import firebase from './init/init';
import { schedulesRef } from './init/ref';
//import getSchedule from './get-schedule';

describe('Firebase Init Tests', () => {
  it('init.js initializes the app', () => {
    const app = firebase.app().name;
    expect(app).toEqual('[DEFAULT]');
  });
  it('ref.js connects to schedules ref', async () => {
    const ref = await schedulesRef.once('value');
    const refObjLength = Object.keys(ref).length;
    expect(refObjLength).not.toBe(0);
  });
});

/*describe('Firebase Query Tests', () => {
  it('get-schedule.js returns an object with the schedule', async () => {
    const schedule = await getSchedule('grill');
    const scheduleObjLength = Object.keys(schedule).length;
    expect(scheduleObjLength).not.toBe(0);
  });
});*/
