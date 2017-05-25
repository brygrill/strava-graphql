import { app, base } from '../rebase';

describe('Rebase Tests', () => {
  it('Firebase object exists', () => {
    expect(app).toBeDefined();
  });
  it('re-base object exists', () => {
    expect(base).toBeDefined();
  });
});
