import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import Lup from '../../../models/Lup'
import multer from 'multer'
import { multerConfig } from '../../../config/multer'
dbConnect()

interface lupope {
  numero: number
  titulo: string
  obs: string
  anexo: string
  descricao: string
  alt: string
}

const handler = nc<NextApiRequest, NextApiResponse>()
handler
  .get((req, res) => {
    try {
      res.json({ message: 'Tentou' })
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  })
  .post(multer(multerConfig).array('files[]', 12), async (req, res) => {
    try {
      // const { originalname, size, filename, path: url = '' } = req.file

      const { nome, equipamento, tag, descricao, criador, passos } = req.body
      let str = tag.trim()
      str = str.replace(/\s{2,}/g, ' ')
      const array = str.split(' ')
      array.push('#UB')

      const passo: Array<lupope> = []
      let aux = 0
      passos.forEach(async (p: string, index: number) => {
        passo.push(await JSON.parse(p))
        if (passo[index].alt !== '') {
          passo[index].anexo = req.files[aux].path
            .replace('public', '')
            .replaceAll('\\', '/')
          aux = aux + 1
        } else {
          passo[index].anexo = ''
        }
      })
      const data = await Lup.findOne({ nome: nome })
      if (data) {
        return res.json({ message: 'Arquivo existente atualizado' })
      } else {
        await Lup.create({
          nome,
          equipamento,
          descricao,
          tags: array,
          passo,
          criador
        })

        return res.json({ message: 'Arquivo salvo com sucesso!' })
      }
    } catch (err) {
      console.log(err)
      return res.json({ message: 'Erro ao processar sua requisição' })
    }
  })
export const config = {
  api: {
    bodyParser: false
  }
}

export default handler
