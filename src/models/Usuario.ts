import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UsuarioSchema = new Schema({
  nome: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    unique: true
  },
  idambev: {
    type: Number,
    required: true,
    unique: true
  },
  perfil: {
    type: String,
    uppercase: true,
    required: true
  }
})

const User = mongoose.models.User || mongoose.model('User', UsuarioSchema)

export default User
