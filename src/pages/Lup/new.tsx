import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Imputt } from '../../styles/pages/New'
import Navbar from '../../components/Navbar'
import { produce } from 'immer'
import { generate } from 'shortid'
import { FaTrash, FaPlus } from 'react-icons/fa'
import axios from 'axios'
import Router from 'next/router'

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
  const [msg, setMsg] = useState(null)
  const { register, handleSubmit } = useForm<FormData>()
  const onSubmit = (data: FormData) => {
    data.passos = passos
    const proced = new FormData()
    data.passos.forEach(i => {
      proced.append('Files[]', i.anexo)
      proced.append('passos[]', JSON.stringify(i))
    })
    proced.append('nome', data.nome)
    proced.append('equipamento', data.equipamento)
    proced.append('tag', data.tag)
    proced.append('descricao', data.descricao)
    proced.append('criador', 'Marlon')
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
        tipoProcedimento: 'lups',
        nomeProcedimento: data.nome
      }
    }
    axios
      .post('/api/Lup', proced, options)
      .then(response => {
        if (response.data.message) {
          setMsg(response.data.message)
          Router.push('/Lup')
        } else {
          setMsg(response.data.error)
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <>
      <Navbar />
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Nova Lup</h1>
          <Imputt>
            <div className="control">
              <input
                style={{ textTransform: 'capitalize' }}
                id="nome"
                required
                autoComplete="off"
                maxLength={40}
                placeholder="Informe nome do procedimento"
                {...register('nome', { required: true })}
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
                placeholder="Informe equipamento aplicavel"
                {...register('equipamento', { required: true })}
              />
              <label>Aplicabidade:</label>
            </div>
          </Imputt>
          <Imputt>
            <div className="control">
              <input
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

          <ul>
            {passos.map((data, index) => (
              <li style={{ marginTop: '10px' }} key={data.id}>
                <div className="passos">
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
                      <input
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
              <button
                type="button"
                className="excluir-passo btn"
                onClick={() => {
                  setPassos(currentPasso => {
                    const listpassos = [...currentPasso]
                    if (listpassos.length > 1) {
                      listpassos.pop()
                    }
                    return listpassos
                  })
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
