import { NextPage } from 'next'
import React from 'react'
import { useForm } from 'react-hook-form'

enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other'
}

interface IFormInput {
  firstName: string
  gender: GenderEnum
}

const App: NextPage = () => {
  const { register, handleSubmit } = useForm<IFormInput>()

  const onSubmit = (data: IFormInput) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input name="firstName" ref={register} />
      <label>Gender Selection</label>
      <select name="gender" ref={register}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input type="submit" />
    </form>
  )
}

export default App
