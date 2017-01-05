/* eslint-disable no-console */
import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../../components/Login';

const mockFunc = (val) => {
  console.log(val);
};

test('Login component should render a login form', () => {
  const component = renderer.create(
    <Login
      emailVal={'my@email.com'}
      emailChange={mockFunc}
      pwdVal={''}
      pwdChange={mockFunc}
      handleSubmit={mockFunc}
    />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
