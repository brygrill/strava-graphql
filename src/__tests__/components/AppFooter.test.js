import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import AppFooter from '../../components/AppFooter';

describe('<AppFooter />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppFooter />, div);
  });
  it('Matches snapshot with child', () => {
    const component = renderer.create(<AppFooter />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
