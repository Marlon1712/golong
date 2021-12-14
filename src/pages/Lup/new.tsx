import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Imputt } from '../../styles/pages/New'
import Navbar from '../../components/Navbar'
import { produce } from 'immer'
import { generate } from 'shortid'
import { FaTrash, FaPlus, FaExclamationTriangle, FaCheck } from 'react-icons/fa'
import axios from 'axios'

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

export default function App(): JSX.Element {
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
        if (response.data) {
          setMsg(response.data)
        } else {
          setMsg(response.data)
        }
      })
      .catch(e => {
        setMsg(e)
      })
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
                  placeholder="Informe nome do procedimento"
                  {...register('nome', { required: true })}
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
                  placeholder="Informe equipamento aplicavel"
                  {...register('equipamento', { required: true })}
                />
                <label>Aplicabidade:</label>
              </div>
            </Imputt>
            <Imputt>
              <div className="control">
                <textarea
                  id="tag"
                  required
                  placeholder="tags"
                  {...register('tag', { required: false })}
                />
                <label>Tags:</label>
              </div>
            </Imputt>
            <Imputt>
              <div className="control">
                <textarea
                  id="descricao"
                  required
                  placeholder="Descreva objetivo do procedimento"
                  {...register('descricao', { required: true })}
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
                        onChange={e => {
                          const numero = parseInt(e.target.value) + 1
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
                          onChange={e => {
                            const obs = e.target.value
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
                      <input
                        type="file"
                        className="custom-file-input"
                        name="file"
                        accept=".png, .jpg, .jpeg, .mp4"
                        onChange={event => {
                          const target = event.target as HTMLInputElement
                          const anexo = (target.files as FileList)[0]
                          setPassos(currentPasso =>
                            produce(currentPasso, v => {
                              v[index].anexo = anexo
                              v[index].src = URL.createObjectURL(anexo)
                              v[index].alt = anexo.name
                            })
                          )
                        }}
                      />
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
