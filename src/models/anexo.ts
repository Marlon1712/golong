import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const AnexoSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  creatAt: {
    type: Date,
    default: Date.now
  }
})

AnexoSchema.pre('save', function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/public/${this.key}`
  }
})

AnexoSchema.pre('remove', function () {
  return promisify(fs.unlink)(path.resolve(__dirname, 'public', this.key))
})

export default mongoose.model('Anexo', AnexoSchema)
