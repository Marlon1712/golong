import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Imput } from '../../styles/pages/New'
import Navbar from '../../components/Navbar'
import { produce } from 'immer'
import { generate } from 'shortid'
import { FaTrash, FaPlus } from 'react-icons/fa'
import axios from 'axios'

interface passosInterface {
  id: string
  numero: number
  titulo: string
  obs: string
  descricao: string
  anexo: string
  src: string
  alt: string
}
interface FormData {
  _id: string
  nome: string
  equipamento: string
  tag: string
  descricao: string
  passos: [
    {
      numero: number
      titulo: string
      obs: string
      descricao: string
      anexo: string
    }
  ]
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
  const url = '/api/Lup'
  const onSubmit = data => {
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
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    axios
      .post(url, proced, options)
      .then(response => {
        if (response.data.message) {
          setMsg(response.data.message)
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
          <Imput>
            <input
              style={{ textTransform: 'capitalize' }}
              id="nome"
              autoComplete="off"
              placeholder="Informe nome do procedimento"
              {...register('nome', { required: true })}
            />
            <label>Nome:</label>
          </Imput>
          <Imput>
            <input
              id="equipamento"
              autoComplete="off"
              placeholder="Informe equipamento aplicavel"
              {...register('equipamento', { required: true })}
            />
            <label>Aplicabidade:</label>
          </Imput>
          <Imput>
            <input
              id="tag"
              placeholder="tags"
              {...register('tag', { required: false })}
            />
            <label>Tags:</label>
          </Imput>
          <div>
            <label>Objetivo:</label>
            <textarea
              id="descricao"
              placeholder="Descreva objetivo do procedimento"
              {...register('descricao', { required: true })}
            />
          </div>
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
                  <Imput>
                    <input
                      style={{ textTransform: 'capitalize' }}
                      id="titulo"
                      name="titulo"
                      className="titulo"
                      autoComplete="off"
                      placeholder="Nome do passo"
                      maxLength={30}
                      onChange={e => {
                        const titulo = e.target.value
                        setPassos(currentPasso =>
                          produce(currentPasso, v => {
                            v[index].titulo = titulo
                          })
                        )
                      }}
                    />
                    <label>Passo:</label>
                  </Imput>
                  <div>
                    <label>
                      Obs.:
                      <textarea
                        id="obs"
                        name="obs"
                        className="obs"
                        autoComplete="off"
                        placeholder="Descreva observações de segurança caso necessario"
                        onChange={e => {
                          const obs = e.target.value
                          setPassos(currentPasso =>
                            produce(currentPasso, v => {
                              v[index].obs = obs
                            })
                          )
                        }}
                      />
                    </label>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <label>
                      Atividade:
                      <textarea
                        autoComplete="off"
                        onChange={e => {
                          const descricao = e.target.value
                          setPassos(currentPasso =>
                            produce(currentPasso, v => {
                              v[index].descricao = descricao
                            })
                          )
                        }}
                        placeholder="Descreva atividade a ser executada no passo"
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Anexo:
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
                        onChange={e => {
                          const anexo = e.target.files[0]
                          setPassos(currentPasso =>
                            produce(currentPasso, v => {
                              v[index].anexo = anexo
                              v[index].src = URL.createObjectURL(anexo)
                              v[index].alt = e.target.files[0].name
                            })
                          )
                        }}
                      />
                    </label>
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
