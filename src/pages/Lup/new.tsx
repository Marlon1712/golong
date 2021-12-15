import { NextPage } from 'next'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Imputt } from '../../styles/pages/New'
import Navbar from '../../components/Navbar'
import { produce } from 'immer'
import { generate } from 'shortid'
import { FaTrash, FaPlus, FaExclamationTriangle, FaCheck } from 'react-icons/fa'
import axios from 'axios'
import setInputHeight from '../../config/setInputHeight'
import Dropzone from 'react-dropzone'
import {
  DropContainer,
  UploadMessage
} from '../../styles/components/UploadZone'

interface passosInterface {
  id: string
  numero: number
  titulo: string
  obs: string
  descricao: string
  anexo: string | File
  src: string
  alt: string
}
interface FormData {
  _id: string
  nome: string
  equipamento: string
  tag: string
  descricao: string
  passos: passosInterface[]
  criador: string
}
interface mssg {
  message?: string
  error?: string
}

const NewLup: NextPage = () => {
  const [passos, setPassos] = useState<passosInterface[]>([
    {
      id: generate(),
      numero: 1,
      titulo: '',
      obs: '',
      descricao: '',
      anexo: '',
      src: '',
      alt: ''
    }
  ])

  const [msg, setMsg] = useState<mssg>({})
  const { register, handleSubmit } = useForm<FormData>()
  const [percentage, setPercentage] = useState(0)
  const [percentLoaded, setPercentLoaded] = useState(0)
  const [percentTotal, setPercentTotal] = useState(0)

  const onSubmit = (data: FormData) => {
    data.passos = passos
    const proced = new FormData()
    data.passos.forEach(i => {
      proced.append('files[]', i.anexo)
      proced.append('passos[]', JSON.stringify(i))
    })
    proced.append('nome', data.nome)
    proced.append('equipamento', data.equipamento)
    proced.append('tag', data.tag)
    proced.append('descricao', data.descricao)
    proced.append('criador', 'Marlon')
    const options = {
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent
        const percent = Math.floor((loaded * 100) / total)
        setPercentage(percent)
        setPercentLoaded(loaded)
        setPercentTotal(total)
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    axios
      .post('/api/Lup', proced, options)
      .then(response => {
        if (response?.data?.message) {
          setMsg({ message: response.data.message })
        } else {
          setMsg({ message: response.data.message })
        }
      })
      .catch(e => {
        setMsg({ error: e })
      })
  }

  const renderDragMessage = (isDragActive, isDragReject, index) => {
    if (!isDragActive) {
      return (
        <UploadMessage>
          {`Click para incluir anexo no Passo ${index + 1}`}
        </UploadMessage>
      )
    }
    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>
    }

    return <UploadMessage type="success">Solte os arquivos</UploadMessage>
  }

  return (
    <>
      <Navbar />
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Nova Lup</h1>
          <div className="cabecalho">
            <Imputt>
              <div className="control">
                <textarea
                  style={{ textTransform: 'capitalize' }}
                  id="nome"
                  required
                  autoComplete="off"
                  placeholder="Nome Da Lup"
                  {...register('nome', { required: true })}
                  onChange={event => setInputHeight(event, '40px')}
                />
                <label>Nome:</label>
              </div>
            </Imputt>
            <Imputt>
              <div className="control">
                <textarea
                  id="equipamento"
                  autoComplete="off"
                  required
                  placeholder="Equipamentos aplicaveis"
                  {...register('equipamento', { required: true })}
                  onChange={event => setInputHeight(event, '40px')}
                />
                <label>Aplicabidade:</label>
              </div>
            </Imputt>
            <Imputt>
              <div className="control">
                <textarea
                  id="tag"
                  required
                  placeholder="Informe tag : exemplo #L541 #ECH ..."
                  {...register('tag', { required: false })}
                  onChange={event => setInputHeight(event, '40px')}
                />
                <label>Tags:</label>
              </div>
            </Imputt>
            <Imputt>
              <div className="control">
                <textarea
                  id="descricao"
                  required
                  placeholder="Breve Descrição/Objetivo"
                  {...register('descricao', { required: true })}
                  onChange={event => setInputHeight(event, '40px')}
                />
                <label htmlFor="objetivo">Descrição:</label>
              </div>
            </Imputt>
          </div>
          <div className="passos">
            <ul>
              {passos.map((data, index) => (
                <li style={{ marginTop: '10px' }} key={data.id}>
                  <div>
                    <div>
                      <input
                        autoComplete="off"
                        onChange={event => {
                          setInputHeight(event, '40px')
                          const numero = parseInt(event.target.value) + 1
                          setPassos(currentPasso =>
                            produce(currentPasso, v => {
                              v[index].numero = numero
                            })
                          )
                        }}
                        style={{ display: 'none' }}
                      />
                    </div>
                    <Imputt>
                      <div className="control">
                        <textarea
                          style={{ textTransform: 'capitalize' }}
                          id="titulo"
                          name="titulo"
                          className="titulo"
                          autoComplete="off"
                          required
                          placeholder={`Titulo do passo ${index + 1}`}
                          maxLength={30}
                          onChange={event => {
                            setInputHeight(event, '40px')
                            const titulo = event.target.value
                            setPassos(currentPasso =>
                              produce(currentPasso, v => {
                                v[index].titulo = titulo
                              })
                            )
                          }}
                        />
                        <label>{`Passo ${index + 1}: `}</label>
                      </div>
                    </Imputt>
                    <Imputt>
                      <div className="control">
                        <textarea
                          id="obs"
                          name="obs"
                          className="obs"
                          required
                          autoComplete="off"
                          placeholder="Digite uma observação caso necessário"
                          onChange={event => {
                            setInputHeight(event, '40px')
                            const obs = event.target.value
                            setPassos(currentPasso =>
                              produce(currentPasso, v => {
                                v[index].obs = obs
                              })
                            )
                          }}
                        />
                        <label htmlFor="obs">Obs.:</label>
                      </div>
                    </Imputt>
                    <Imputt>
                      <div className="control">
                        <textarea
                          name="description"
                          placeholder="Descreva atividade a ser executada no passo"
                          required
                          autoComplete="off"
                          onChange={event => {
                            setInputHeight(event, '40px')
                            const descricao = event.target.value
                            setPassos(currentPasso =>
                              produce(currentPasso, v => {
                                v[index].descricao = descricao
                              })
                            )
                          }}
                        ></textarea>
                        <label htmlFor="description">Atividade:</label>
                      </div>
                    </Imputt>
                    <div className="view-input">
                      <label>Anexo:</label>
                      {!!data.src && (
                        <div className="img-container">
                          {data.alt.indexOf('mp4') < 0 && (
                            <img src={data.src} alt="anexo" />
                          )}
                          {data.alt.indexOf('mp4') > 0 && (
                            <video src={data.src} className="video-preview" />
                          )}
                        </div>
                      )}
                      <Dropzone
                        onDrop={acceptedFiles => {
                          const anexo = acceptedFiles[0]
                          setPassos(currentPasso =>
                            produce(currentPasso, v => {
                              v[index].anexo = anexo
                              v[index].src = URL.createObjectURL(anexo)
                              v[index].alt = anexo.name
                            })
                          )
                        }}
                      >
                        {({
                          getRootProps,
                          getInputProps,
                          isDragActive,
                          isDragReject
                        }) => (
                          <section>
                            <DropContainer {...getRootProps()}>
                              <input {...getInputProps()} />

                              {renderDragMessage(
                                isDragActive,
                                isDragReject,
                                index
                              )}
                            </DropContainer>
                          </section>
                        )}
                      </Dropzone>
                    </div>
                  </div>
                </li>
              ))}

              <div className="btns">
                <button
                  type="button"
                  className="add-passo btn"
                  onClick={() => {
                    setPassos(currentPasso => [
                      ...currentPasso,
                      {
                        id: generate(),
                        numero: currentPasso.length + 1,
                        titulo: '',
                        obs: '',
                        descricao: '',
                        anexo: '',
                        src: '',
                        alt: ''
                      }
                    ])
                  }}
                >
                  <FaPlus />
                </button>
                <button type="button" className="excluir-passo btn">
                  <FaTrash />
                </button>
              </div>
            </ul>
          </div>
          <div className="animation-upload">
            {percentage > 0 && percentage < 100 ? (
              <span style={{ color: 'gray' }}>{`${percentage}% - ${parseFloat(
                (percentLoaded / 1024 / 1024).toFixed(2)
              )}MB of ${parseFloat(
                (percentTotal / 1024 / 1024).toFixed(2)
              )}MB`}</span>
            ) : null}
            {msg?.error && (
              <span>
                <FaExclamationTriangle />
                {msg.error}
              </span>
            )}
            {msg?.message && (
              <span style={{ color: 'green' }}>
                <FaCheck /> {msg?.message}
              </span>
            )}
          </div>
          <div>
            <button className="submit-passo btn" type="submit">
              Salvar
            </button>
          </div>
        </form>
      </Container>
    </>
  )
}

export default NewLup
