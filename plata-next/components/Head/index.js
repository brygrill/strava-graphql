import React, { PropTypes } from 'react';
import Head from 'next/head';

const Header = (props) => {
  const pgTitle = props.title ? `Plata | ${props.title}` : 'Plata';
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{pgTitle}</title>
        <meta name="author" content="" />
        <meta name="description" content="" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#424242" />
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.6/semantic.min.css" />
        <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="/static/styles/main.css" />
      </Head>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
