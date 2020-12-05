import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'
import axios from 'axios'

interface User {
  _id: string
  nome: string
  idambev: number
}

export default function Usuario({ nome, idambev }: User): JSX.Element {
  return (
    <div>
      <h1>Seja bem Vindo {nome}</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const _id = context.query._id as string
  const response = await axios.get<User>(
    `http://localhost:3000/api/user/${_id}`
  )
  const user = response.data

  return {
    props: user
  }
}
