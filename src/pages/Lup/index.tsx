import { NextPage } from 'next'
import React, { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import api from '../../services/api'
import { Container } from '../../styles/pages/Lup_list'
import { FaTrash, FaPencilAlt, FaSearch } from 'react-icons/fa'
interface lup {
  _id: string
  nome: string
  equipamento: string
  descricao: string
  passos: []
  criador: string
}
const Lup: NextPage = () => {
  const [buscatag, setBusca] = useState('#UB')
  const [txtbusca, setTxtbusca] = useState('')

  const [data, setData] = useState<lup[]>([])
  const buscar = async () => {
    const response = await api.get<lup[]>('/Lup', {
      headers: { tag: buscatag }
    })
    setData(response.data)
  }
  useEffect(() => {
    buscar()
  }, [buscatag])
  const excluirProcediment = useCallback((id: string) => {
    api.delete(`/Lup/${id}`)
  }, [])
  return (
    <>
      <Navbar />
      <Container>
        <h1 style={{ marginTop: '60px' }}>{"Lup's"}</h1>
        <div className="filtro">
          <input
            name="tag"
            onChange={event => {
              setTxtbusca(event.target.value)
            }}
          />
          <button
            className="btn-go"
            onClick={() => {
              if (txtbusca !== '') {
                setBusca(txtbusca)
              } else {
                setBusca('#UB')
              }
            }}
          >
            <FaSearch />
          </button>
        </div>
        <div className="listagem">
          <ul>
            {data?.map(doc => (
              <li key={doc._id}>
                <div className="comando-link">
                  <Link href={`/Lup/${doc._id}`} passHref>
                    <a>{doc.nome}</a>
                  </Link>
                </div>
                <div className="comando">
                  <button className="btn-excluir">
                    <FaPencilAlt />
                  </button>
                  <button
                    className="btn-excluir"
                    onClick={() => {
                      excluirProcediment(doc._id)
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button className="btn-new">
            <Link href="/Lup/new">
              <h2>Nova Lup</h2>
            </Link>
          </button>
        </div>
      </Container>
    </>
  )
}

export default Lup
