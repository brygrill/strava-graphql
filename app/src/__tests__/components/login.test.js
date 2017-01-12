/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Login from '../../components/LoginForm';

const mockFunc = (val) => {
  console.log(val);
};

it('Login component renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login />, div);
});

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
