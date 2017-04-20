import React from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';
import App from '../app';

describe('<App />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
  /*  it('Matches snapshot', () => {
    const component = renderer.create(<DashboardPage />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });*/
});
