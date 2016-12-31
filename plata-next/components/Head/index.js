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
        <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/static/favicons/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/static/favicons/favicon-16x16.png" sizes="16x16" />
        <link rel="manifest" href="/static/favicons/manifest.json" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#446cb3" />
        <meta name="apple-mobile-web-app-title" content="Plata" />
        <meta name="application-name" content="Plata" />
        <meta name="theme-color" content="#446cb3" />
        <meta name="author" content="Plata" />
        <meta name="description" content="Simply Plan Your Training" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
