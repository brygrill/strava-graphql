// @flow
import React, { Component } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

export default class DashboardAppBar extends Component {
  static defaultProps = {
    list: [],
    listTitle: 'List Title',
  };

  props: {
    list?: Array,
    listTitle?: string,
    primary: string,
    secondary: string,
  };

  render() {
    const { list, listTitle, primary, secondary } = this.props;
    return (
      <div>
        <Typography type="title">
          {listTitle}
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
