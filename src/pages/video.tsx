import React from 'react'
import Head from 'next/head'

import { Container } from '../styles/pages/video'
import { NextPage } from 'next'
const imageURL = '/images/naruto-boruto.jpg'
const videoURL = '/videos/baroes.mp4'
const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Homepage</title>
      </Head>

      <h1>Hello World</h1>
      <p>Iniciando com Next.js</p>
      <video
        style={{ height: '100vw', width: '100vw' }}
        controls
        poster={imageURL}
        src={videoURL}
      />
      <p>Fim do arquivo</p>
    </Container>
  )
}

export default Home
