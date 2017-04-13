import moment from 'moment';
import _ from 'lodash';

export default class DataUtility {
  // Utility class for formatting data
  // Accepts firebase obj and sets to
  // Array of objects
  constructor(source) {
    this.toArray = _.valuesIn(source);
  }

  // Return dates that have not passed
  dateNotPast() {
    return _.filter(this.toArray, o => {
      return moment(o.date).isSameOrAfter(moment(), 'day');
    });
  }

  // Format date to Day, Month, Date
  static formatDate(date) {
    return moment(date).format('dddd, MMMM Do');
  }

  // String to proper text
  static proper(input) {
    return _.capitalize(input);
  }
}
