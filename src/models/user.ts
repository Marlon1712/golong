'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const schema = new Schema({
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

export default mongoose.model('Usuario', schema)
