import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import BookFalha from '../../../models/BookFalhas'
import multer from 'multer'
import { multerConfig } from '../../../config/multer'

dbConnect()

interface bookope {
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

const handler = nc<NextApiRequest, NextApiResponse>()
handler
  .get(async (req, res) => {
    try {
      let str = req.headers.tag?.toString().trim()
      str = str?.replace(/\s{2,}/g, ' ')
      const array = str?.split(' ')

      const data = await BookFalha.find({ tags: { $all: array } })
      res.status(200).send(data)
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  })
  .post(multer(multerConfig).array('Files[]', 12), async (req, res) => {
    try {
      // const { originalname, size, filename, path: url = '' } = req.file
      const { nome, equipamento, tag, descricao, criador, passos } = req.body
      let str = tag.trim()
      str = str.replace(/\s{2,}/g, ' ')
      const array = str.split(' ')
      array.push('#UB')

      const passo: Array<bookope> = []
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const files = req.files as any // { [fieldname: string]: Express.Multer.File[] }
      // const files = multer.many(req.files, 'Files[]')
      passos.forEach(async (p: string, index: number) => {
        passo.push(await JSON.parse(p))
        if (passo[index].alt !== '') {
          const file = files.find(
            (f: filler) => f.filename === passo[index].alt
          )
          passo[index].anexo = file.path
            .replace('public', '')
            .replaceAll('\\', '/')
        } else {
          passo[index].anexo = ''
        }
      })
      const data = await BookFalha.findOne({ nome: nome })
      if (data) {
        return res.json({ message: 'Arquivo existente atualizado' })
      } else {
        await BookFalha.create({
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
// .post(async (req, res) => {
//   try {
//     const dirre = `./public/uploads/lups/${req.headers.nomeprocedimento}`
//     fs.mkdirSync(dirre)
//     // fs.readdir('./public/uploads/images', async (err, paths) => {
//     //   await console.log(paths.length)
//     // })
//     const form = formidable({
//       multiples: true,
//       uploadDir: dirre,
//       keepExtensions: true
//     })
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         return res.json({ message: 'Erro ao processar sua requisição' })
//       }
//       console.log(files)
//     })
//   } catch (e) {
//     if (e.code != 'EEXIST') throw e
//     console.log(err)
//     return res.json({ message: 'Erro ao processar sua requisição' })
//   }
// })
export const config = {
  api: {
    bodyParser: false
  }
}

export default handler
