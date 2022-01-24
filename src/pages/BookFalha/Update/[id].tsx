import React, { useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { useForm } from 'react-hook-form'
import { Container, Imputt } from '../../../styles/pages/New'
import Navbar from '../../../components/Navbar'
import { generate } from 'shortid'
import { FaTrash, FaPlus } from 'react-icons/fa'
import axios from 'axios'
import { produce } from 'immer'
import Router from 'next/router'
import Loading from '../../../components/loading-animation'

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
  tags: string
  descricao: string
  passo: passosInterface[]
  criador: string
}
interface Props {
  data: FormData
}

const Page: NextPage<Props> = props => {
  const [msg, setMsg] = useState(null)
  const [data, setData] = useState<FormData>(props.data)
  const { handleSubmit } = useForm<FormData>()

  const onSubmit = () => {
    const proced = new FormData()
    data.passo.forEach(i => {
      proced.append('Files[]', i.anexo)
      proced.append('passos[]', JSON.stringify(i))
    })
    proced.append('nome', data.nome)
    proced.append('equipamento', data.equipamento)
    proced.append('tag', data.tags)
    proced.append('descricao', data.descricao)
    proced.append('criador', 'Marlon')
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
        tipoProcedimento: 'books',
        nomeProcedimento: data.nome
      }
    }
    axios
      .put(`/api/BookFalha/${data._id}`, proced, options)
      .then(response => {
        if (response.data.message) {
          setMsg(response.data.message)
          Router.push('/BookFalha')
        } else {
          setMsg(response.data.error)
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
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

  return (
    <>
      <Navbar />
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Editar Book</h1>
          <Imputt>
            <div className="control">
              <input
                style={{ textTransform: 'capitalize' }}
                id="nome"
                required
                value={data?.nome}
                autoComplete="off"
                placeholder="Informe nome do procedimento"
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onChange={() => {}}
              />
              <label>Nome:</label>
            </div>
          </Imputt>
          <Imputt>
            <div className="control">
              <input
                id="equipamento"
                autoComplete="off"
                required
                defaultValue={data?.equipamento}
                placeholder="Informe equipamento aplicavel"
                onChange={event => {
                  const equipamento = event.target.value
                  setData(currentPasso =>
                    produce(currentPasso, v => {
                      v.equipamento = equipamento
                    })
                  )
                }}
              />
              <label>Aplicabidade:</label>
            </div>
          </Imputt>
          <Imputt>
            <div className="control">
              <input
                id="tag"
                required
                defaultValue={data?.tags}
                placeholder="tags"
                onChange={event => {
                  const tags = event.target.value
                  setData(currentPasso =>
                    produce(currentPasso, v => {
                      v.tags = tags
                    })
                  )
                }}
              />
              <label>Tags:</label>
            </div>
          </Imputt>
          <Imputt>
            <div className="control">
              <textarea
                id="descricao"
                required
                defaultValue={data?.descricao}
                placeholder="Descreva objetivo do procedimento"
                onChange={event => {
                  const desc = event.target.value
                  setData(currentPasso =>
                    produce(currentPasso, v => {
                      v.descricao = desc
                    })
                  )
                }}
              />
              <label htmlFor="objetivo">Descrição:</label>
            </div>
          </Imputt>

          <ul>
            {data?.passo?.map((passo: passosInterface, index: number) => (
              <li style={{ marginTop: '10px' }} key={passo.id}>
                <div className="passos">
                  <div>
                    <input
                      autoComplete="off"
                      defaultValue={passo.numero}
                      onChange={e => {
                        const numero = parseInt(e.target.value) + 1
                        setData(currentPasso =>
                          produce(currentPasso, v => {
                            v.passo[index].numero = numero
                          })
                        )
                      }}
                      style={{ display: 'none' }}
                    />
                  </div>
                  <Imputt>
                    <div className="control">
                      <input
                        style={{ textTransform: 'capitalize' }}
                        id="titulo"
                        name="titulo"
                        className="titulo"
                        autoComplete="off"
                        required
                        defaultValue={passo.titulo}
                        placeholder={`Titulo do passo ${index + 1}`}
                        maxLength={30}
                        onChange={event => {
                          const titulo = event.target.value
                          setData(currentPasso =>
                            produce(currentPasso, v => {
                              v.passo[index].titulo = titulo
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
                        defaultValue={passo.obs}
                        autoComplete="off"
                        placeholder="Digite uma observação caso necessário"
                        onChange={e => {
                          const obs = e.target.value
                          setData(currentPasso =>
                            produce(currentPasso, v => {
                              v.passo[index].obs = obs
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
                        defaultValue={passo.descricao}
                        autoComplete="off"
                        onChange={event => {
                          const descricao = event.target.value
                          setData(currentPasso =>
                            produce(currentPasso, v => {
                              v.passo[index].descricao = descricao
                            })
                          )
                        }}
                      ></textarea>
                      <label htmlFor="description">Atividade:</label>
                    </div>
                  </Imputt>
                  <div className="view-input">
                    <label>Anexo:</label>
                    {passo?.anexo && (
                      <div className="img-container">
                        {typeof passo.anexo === 'string' ? (
                          <>
                            {passo.alt?.indexOf('mp4') < 0 && (
                              <img src={passo.anexo} alt="anexo" />
                            )}
                            {passo?.alt?.indexOf('mp4') > 0 && (
                              <video
                                src={passo.anexo}
                                className="video-preview"
                              />
                            )}
                          </>
                        ) : (
                          <>
                            {passo.alt?.indexOf('mp4') < 0 && (
                              <img src={passo.src} alt="anexo" />
                            )}
                            {passo?.alt?.indexOf('mp4') > 0 && (
                              <video
                                src={passo.src}
                                className="video-preview"
                              />
                            )}
                          </>
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
                        setData(currentPasso =>
                          produce(currentPasso, v => {
                            v.passo[index].anexo = anexo
                            v.passo[index].src = URL.createObjectURL(anexo)
                            v.passo[index].alt = anexo.name
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
                  setData(currentPasso =>
                    produce(currentPasso, v => {
                      v.passo.push({
                        id: generate(),
                        numero: currentPasso.passo.length + 1,
                        titulo: '',
                        obs: '',
                        descricao: '',
                        anexo: '',
                        src: '',
                        alt: ''
                      })
                    })
                  )
                }}
              >
                <FaPlus />
              </button>
              <button
                type="button"
                className="excluir-passo btn"
                onClick={() => {
                  setData(currentPasso =>
                    produce(currentPasso, v => {
                      v.passo.pop()
                    })
                  )
                }}
              >
                <FaTrash />
              </button>
            </div>
          </ul>
          <div>
            <button className="submit-passo btn" type="submit">
              Salvar
            </button>
          </div>
          {msg && <span>{msg}</span>}
        </form>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const res = await fetch(
    `http://localhost:3000/api/BookFalha/${context.query.id}`
  )
  const data: FormData = await res.json()

  return {
    props: {
      data
    }
  }
}

export default Page
