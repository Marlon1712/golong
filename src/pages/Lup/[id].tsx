import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react' // import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container } from '../../styles/pages/Lup'
import Navbar from '../../components/Navbar'
import { QRCode } from 'react-qrcode-logo'
import { procedimentFetch } from '../../hooks/procedimentFetch'
import Loading from '../../components/loading-animation'
import { Date } from 'mongoose'

interface lup {
  _id: string
  nome: string
  equipamento: string
  tags: [string]
  descricao: string
  passo: [
    {
      _id: string
      numero: number
      titulo: string
      obs: string
      descricao: string
      anexo: string
    }
  ]
  criador: string
  createdAt: Date
  updatedAt: Date
}
interface props {
  id: string
  urlEnv: string
}

interface passoviwer {
  _id: string
  numero: number
  titulo: string
  obs: string
  descricao: string
  anexo: string
}

export default function Lup({ id, urlEnv }: props) {
  const urlDev = `/Lup/${id}`
  const { isFallback } = useRouter()
  const { data } = procedimentFetch<lup>(urlDev)

  if (isFallback) {
    return (
      <>
        <Navbar />
        <Container>
          <Loading />
        </Container>
      </>
    )
  }

  function viewAnexo(passo: passoviwer) {
    if (passo.anexo) {
      if (passo.anexo.indexOf('mp4') > 0) {
        return (
          <div className="passos videoo">
            <video controls>
              <source src={passo.anexo} type="video/mp4"></source>
            </video>
          </div>
        )
      } else {
        return (
          <div className="passos videoo">
            <img src={passo.anexo} alt="anexo" />
          </div>
        )
      }
    } else {
      return null
    }
  }

  return (
    <>
      <Navbar />
      <Container>
        <div className="form">
          <div className="footer">
            <QRCode value={`${urlEnv}/Lup/${id}`} />
          </div>
          <h1>{data?.nome}</h1>
          <p className="desc-procedimento">
            <strong>{'Aplicavel: '}</strong>
            {data?.equipamento}
          </p>
          <p className="desc-procedimento">
            <strong>{'Descrição: '}</strong>
            {data?.descricao}
          </p>
          <ul>
            {data?.passo.map(pass => (
              <li key={pass._id}>
                <div className="passos">
                  {pass?.titulo && <h2>{`${pass.numero} - ${pass.titulo}`}</h2>}
                  {pass?.obs && (
                    <p className="page-obs">
                      <strong style={{ color: 'red' }}>{'Obs.: '}</strong>{' '}
                      {pass.obs}
                    </p>
                  )}
                  {viewAnexo(pass)}
                  {pass?.descricao && (
                    <p className="desc-procedimento">
                      <strong>{'Atividade: '}</strong>
                      {pass.descricao}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly'
            }}
          >
            <p className="desc-procedimento">
              <strong>{'Criado em: '}</strong>
              {data?.createdAt}
            </p>
            <p className="desc-procedimento">
              <strong>{'Ultima modificação: '}</strong>
              {data?.updatedAt}
            </p>
          </div>
        </div>
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.APP_URL}/api/Lup`, {
    headers: { tag: 'UB' }
  })
  const data = await response.json()

  const paths = data.map((l: lup) => {
    return { params: { id: l._id } }
  })

  return {
    paths,
    fallback: true
  }
}
interface IParams extends ParsedUrlQuery {
  id: string
}
export const getStaticProps: GetStaticProps = context => {
  const { id } = context.params as IParams

  return {
    props: {
      id,
      urlEnv: process.env.APP_URL
    },
    revalidate: 30
  }
}
