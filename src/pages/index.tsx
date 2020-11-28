import React from 'react'
import Head from 'next/head'

import { Container } from '../styles/pages/Home'
import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>

      <h1>Hello World</h1>
      <p>Iniciando com Next.js</p>
    </Container>
  )
}

export default Home
