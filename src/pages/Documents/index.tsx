import { NextPage } from 'next'
import React from 'react'

const Document: NextPage = () => {
  return (
    <div>
      <h1>Pagina de Listagem de Usuarios</h1>
    </div>
  )
}

export default Document

Document.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/Documents')
  const { data } = await res.json

  return { documents: data }
}
