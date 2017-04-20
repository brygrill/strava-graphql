import React from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';
import DashboardPage from '../dashboard';

describe('<DashboardPage />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DashboardPage />, div);
  });
  /*  it('Matches snapshot', () => {
    const component = renderer.create(<DashboardPage />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });*/
});
