import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UsuarioSchema = new Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  idambev: {
    type: Number,
    required: true,
    unique: true
  }
})

const Usuario =
  mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema)

export default Usuario
