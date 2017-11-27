// @flow
import React, { Component } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { emojify } from 'react-emojione';

export default class DashboardAppBar extends Component {
  static defaultProps = {
    list: [],
    listTitle: 'List Title',
    titleEmoji: ':punch:',
  };

  props: {
    list?: Array,
    listTitle?: string,
    titleEmoji?: string,
    primary: string,
    secondary: string,
  };

  render() {
    const { list, listTitle, titleEmoji, primary, secondary } = this.props;
    return (
      <div>
        <Typography type="title">
          {emojify(`${listTitle} ${titleEmoji}`)}
        </Typography>
        <List>
          {list.map(item => (
            <ListItem key={item[primary]}>
              <ListItemText
                primary={`${item[primary]}:`}
                secondary={item[secondary]}
              />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}
