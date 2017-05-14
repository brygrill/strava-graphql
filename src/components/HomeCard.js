// @flow
import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

export default class HomeCard extends Component {
  props: {
    title: string,
    img: string,
    alt: string,
    imgClass: string,
    content: string,
  };
  render() {
    const { title, img, alt, imgClass, content } = this.props;
    return (
      <Card>
        <CardMedia>
          <img src={img} alt={alt} className={imgClass} />
        </CardMedia>
        <CardTitle title={title} />
        <CardText>
          {content}
        </CardText>
      </Card>
    );
  }
}
