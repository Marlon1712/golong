import { NextPage } from 'next'
import React, { useCallback } from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import api from '../../services/api'
import { Container } from '../../styles/pages/Lup_list'
import { FaTrash, FaPencilAlt } from 'react-icons/fa'
import { procedimentFetch } from '../../hooks/procedimentFetch'
interface lup {
  _id: string
  nome: string
  equipamento: string
  descricao: string
  passos: []
  criador: string
}
const Procedimento: NextPage = () => {
  const urlDev = '/Lup'

  const { data } = procedimentFetch<lup[]>(urlDev)

  const excluirProcediment = useCallback((id: string) => {
    api.delete(`/Lup/${id}`)
  }, [])
  return (
    <>
      <Navbar />
      <Container>
        <h1 style={{ marginTop: '60px' }}>{'Procedimento'}</h1>
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
              <h2>Novo Procedimento</h2>
            </Link>
          </button>
        </div>
      </Container>
    </>
  )
}

export default Procedimento
