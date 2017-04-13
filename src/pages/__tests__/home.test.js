import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import HomePage from '../home';

const mockSchedule = [
  { date: '04012017', time: '12pm', type: 'practice' },
  { date: '04032017', time: '6pm', type: 'practice' },
  { date: '04032017', time: '10:30am', type: 'practice' },
  { date: '04032017', time: '6pm', type: 'practice' },
];

describe('<HomePage />', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HomePage schedule={mockSchedule} />, div);
  });
  it('Matches snapshot', () => {
    const component = renderer.create(<HomePage schedule={mockSchedule} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
