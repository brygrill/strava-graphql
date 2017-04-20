import base from './index';

describe('Rebase Tests', () => {
  it('Rebase object exists', () => {
    expect(base).toHaveProperty('name', '[DEFAULT]');
    expect(base).toHaveProperty('initializedApp');
  });
});
