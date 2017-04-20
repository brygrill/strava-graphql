import React from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';
import NotFoundPage from '../notfound';

describe('<NotFoundPage />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NotFoundPage />, div);
  });
  /*  it('Matches snapshot', () => {
    const component = renderer.create(<NotFoundPage />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });*/
});
