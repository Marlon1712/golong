import { NextPage } from 'next'
import React from 'react'
import { useForm } from 'react-hook-form'
import { deflate } from 'zlib'

interface IFormInput {
  firstName: string
  lastName: string
  age: number
}

const App: NextPage = () => {
  const { register, handleSubmit } = useForm<IFormInput>()
  const onSubmit = (data: IFormInput) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input
        name="firstName"
        ref={register({ required: true, maxLength: 20 })}
      />
      <label>Last Name</label>
      <input name="lastName" ref={register({ pattern: /^[A-Za-z]+$/i })} />
      <label>Age</label>
      <input name="age" type="number" ref={register({ min: 18, max: 99 })} />
      <input type="submit" />
    </form>
  )
}

export default App
