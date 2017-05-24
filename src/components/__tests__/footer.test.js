import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Footer from '../mycomponent';

describe('<Footer />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Footer />, div);
  });
  it('Matches snapshot with child', () => {
    const component = renderer.create(<Footer />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
