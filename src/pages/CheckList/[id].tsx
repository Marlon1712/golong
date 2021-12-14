import { NextPageContext, NextPage } from 'next'
import React from 'react'
import { Container } from '../../styles/pages/Lup'
import Navbar from '../../components/Navbar'
import { QRCode } from 'react-qrcode-logo'
import { procedimentFetch } from '../../hooks/procedimentFetch'
import Loading from '../../components/loading-animation'
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
}
interface props {
  _id: string
}
interface passoviwer {
  _id: string
  numero: number
  titulo: string
  obs: string
  descricao: string
  anexo: string
}

const Lup: NextPage<props> = ({ _id }) => {
  const urlDev = `/Lup/${_id}`
  const { data } = procedimentFetch<lup>(urlDev)

  if (!data) {
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
            <QRCode value={`http://192.168.100.8:3000/Lup/${_id}`} />
          </div>
          <h1>{data?.nome}</h1>
          <h5 className="desc-procedimento">{data?.descricao}</h5>
          <h5 className="desc-procedimento">
            <strong>{'Aplicavel: '}</strong>
            {data?.equipamento}
          </h5>
          <ul>
            {data?.passo.map(pass => (
              <li key={pass._id}>
                <div className="passos">
                  {pass?.titulo && <h2>{`${pass.numero} - ${pass.titulo}`}</h2>}

                  {pass?.obs && (
                    <p className="page-obs">
                      <strong>{'Obs.: '}</strong> {pass.obs}
                    </p>
                  )}
                  {viewAnexo(pass)}
                  {pass?.descricao && (
                    <p className="desc-passo">
                      <strong>{'Atividade: '}</strong>
                      {pass.descricao}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  )
}

Lup.getInitialProps = (context: NextPageContext) => {
  const _id = context.query.id as string

  return { _id }
}

export default Lup
