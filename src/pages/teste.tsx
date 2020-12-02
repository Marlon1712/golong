import React from 'react'
import Head from 'next/head'
import '../hooks/uploads'

import { Container } from '../styles/pages/Home'
import { NextPage } from 'next'

const Home: NextPage = () => {
  const teste = Previews()
  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>
      <teste />
      <h1>Hello World</h1>
      <p>Iniciando com Next.js</p>
    </Container>
  )
}

export default Home
