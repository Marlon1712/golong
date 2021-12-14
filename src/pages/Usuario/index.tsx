import { NextPage } from 'next'
import React from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import { Container } from '../../styles/pages/Usuario'



const Usuario: NextPage = () => {
  
  return (
    <>
      <Navbar />
      <Container>
        <h1>Listagem de Usuarios</h1>
        <div className="listagem">
          <h2>{"Aqui sera listado todos os Usuarios cadastrados no sistema"}</h2>
        </div>
        <div>
          <Link href={'/'} passHref>
            <button>Voltar</button>
          </Link>
        </div>
      </Container>
    </>
  )
}

export default Usuario
