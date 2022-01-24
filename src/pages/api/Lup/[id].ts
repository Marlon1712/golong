import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Lup from '../../../models/Lup'
import dbConnect from '../../../config/dbConnect'
import multer from 'multer'
import { multerConfig } from '../../../config/multer'

interface ilup {
  nome: string
  equipamento: string
  tags: [string]
  descricao: string
  passos: []
  criador: string
}
interface lupope {
  numero: number
  titulo: string
  obs: string
  anexo: string
  descricao: string
  alt: string
}
interface filler {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

dbConnect()
let id: string
const handler = nc<NextApiRequest, NextApiResponse>()

handler
  .use((req, res, next) => {
    try {
      id = req.query.id.toString()
    } catch (err) {
      console.log(err)
    }

    next()
  })
  .get(async (req, res) => {
    try {
      const data: ilup = await Lup.findById(id)
      res.status(200).send(data)
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  })
  .put(multer(multerConfig).array('Files[]', 12), async (req, res) => {
    try {
      // const { originalname, size, filename, path: url = '' } = req.file
      const { nome, equipamento, tag, descricao, criador, passos } = req.body
      let str = tag.trim()
      str = str.replace(/\s{2,}/g, ' ')
      const array = str.split(',')

      const passo: Array<lupope> = []
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const files = req.files as any // { [fieldname: string]: Express.Multer.File[] }
      // const files = multer.many(req.files, 'Files[]')
      await passos.forEach(async (p: string, index: number) => {
        passo.push(await JSON.parse(p))
        if (passo[index].alt !== '') {
          const file = files.find(
            (f: filler) => f.filename === passo[index].alt
          )
          if (file) {
            passo[index].anexo = file.path
              .replace('public', '')
              .replaceAll('\\', '/')
          }
        } else {
          passo[index].anexo = ''
        }
      })
      await Lup.updateOne(
        { _id: id },
        {
          $set: {
            equipamento: equipamento,
            descricao: descricao,
            tags: array,
            passo: passo
          },
          $currentDate: { lastModified: true }
        }
      )
      res.status(200).send({
        message: 'Lupo atualizado com sucesso!'
      })
    } catch (err) {
      console.log(err)
      return res.json({ message: 'Erro ao processar sua requisição' })
    }
  })
  .delete(async (req, res) => {
    try {
      const lup = await Lup.findById(id)
      await lup.remove()
      res.status(200).send({
        message: 'Lupo removido com sucesso!'
      })
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  })

export const config = {
  api: {
    bodyParser: false
  }
}
export default handler
