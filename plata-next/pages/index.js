import React from 'react';
import Link from 'next/link';
import { Container, Header } from 'semantic-ui-react';
import Head from '../components/Head';

const Home = () => {
  return (
    <div>
      <Head />
      <Container>
        <Header
          as="h1"
          textAlign="center"
          content="Plata home"
        />
        <div><Link href="/login"><a>Login</a></Link></div>
        <div><Link href="/athlete"><a>Athlete</a></Link></div>
      </Container>
    </div>
  );
};

export default Home;
