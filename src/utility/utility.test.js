import DataUtility from '../utility';

const mockSource = {
  '040117': { date: '2017-04-01', time: '12pm', type: 'practice' },
  '040317': { date: '2017-04-03', time: '6pm', type: 'practice' },
  '040817': { date: '2017-04-08', time: '10:30am', type: 'practice' },
  '041017': { date: '2017-04-10', time: '6pm', type: 'practice' },
  '041517': { date: '2020-04-15', time: 'TBA', type: 'practice' },
  '041717': { date: '2017-04-17', time: '6pm', type: 'practice' },
  '042017': { date: '2025-04-20', time: 'TBA', type: 'game' },
};

const data = new DataUtility(mockSource);

describe('Utility Class Tests', () => {
  it('properly instantiates the class', () => {
    expect(data.toArray).toMatchSnapshot();
  });

  it('dateNotPast() filters dates that have passed', () => {
    const filteredData = data.dateNotPast();
    expect(filteredData.length).toBeLessThan(data.toArray.length);
  });

  it('formatDate() properly reformats the date', () => {
    const day = DataUtility.formatDate(data.toArray[0].date);
    expect(day).toMatchSnapshot();
  });

  it('proper() properly reformats string', () => {
    const word = DataUtility.proper(data.toArray[0].type);
    expect(word).toMatchSnapshot();
  });
});
