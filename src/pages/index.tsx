import React from 'react'
import Head from 'next/head'

import { Container } from '../styles/pages/Home'
import { NextPage } from 'next'
import Navbar from '../components/Navbar'

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Head>
          <title>Homepage</title>
        </Head>
        <h1>Hello World</h1>
        <p>Iniciando com Next.js agora com Docker!</p>
      </Container>
    </>
  )
}

export default Home