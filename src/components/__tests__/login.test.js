import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import LoginComponent from '../login';

const myMock = jest.fn();

describe('<LoginComponent />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginComponent login={myMock} error={false} />, div);
  });
  it('Fires login function on submit', () => {
    const wrapper = mount(<LoginComponent login={myMock} error={false} />);
    wrapper.find('Form').simulate('submit');
    expect(myMock.mock.calls.length).toBe(1);
  });
  it('Matches snapshot with no error', () => {
    const component = renderer.create(
      <LoginComponent login={myMock} error={false} />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Matches snapshot with error', () => {
    const component = renderer.create(<LoginComponent login={myMock} error />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
