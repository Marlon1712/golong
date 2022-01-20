import mongoose, { Document } from 'mongoose'
import fs from 'fs'
import rimraf from 'rimraf'
// import { promisify } from 'util'

interface lup extends Document {
  nome: string
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
  try {
    const dirre = `./public/uploads/lups/${this.nome}`
    if (fs.existsSync(dirre)) {
      // Efetua a criação do diretório
      return rimraf(dirre, function () {
        console.log('done')
      })
    }
  } catch (error) {
    console.log(error)
  }
})

/** LupSchema.pre('updateOne', function () {
  console.log('----------------------------------------update')
}) */

export default mongoose.models.Lup || mongoose.model('Lup', LupSchema)
