import mongoose, { Document } from 'mongoose'
import fs from 'fs'
import { promisify } from 'util'

interface lup extends Document {
  passo: [
    {
      anexo: string
    }
  ]
}
const LupSchema = new mongoose.Schema(
  {
    nome: String,
    equipamento: String,
    descricao: String,
    tags: [String],
    passo: [
      {
        numero: Number,
        titulo: String,
        obs: String,
        anexo: String,
        descricao: String,
        alt: String
      }
    ],
    criador: String
  },
  {
    timestamps: true
  }
)

LupSchema.pre('remove', function (this: lup) {
  return this.passo.forEach(pass => {
    if (pass.anexo !== '') {
      promisify(fs.unlink)(`./public${pass.anexo}`)
    }
  })
})

/** LupSchema.pre('updateOne', function () {
  console.log('----------------------------------------update')
}) */

export default mongoose.models.Lup || mongoose.model('Lup', LupSchema)
