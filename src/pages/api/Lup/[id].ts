import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Lup from '../../../models/Lup'
import dbConnect from '../../../config/dbConnect'

interface ilup {
  nome: string
  equipamento: string
  tags: [string]
  descricao: string
  passos: []
  criador: string
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
  .put(async (req, res) => {
    try {
      await Lup.updateOne(
        {
          _id: id,
          'passos._id': req.body._id
        },
        {
          $set: {
            nome: req.body.nome,
            'passos.$.descricao': req.body.descricao
          }
        }
      )
      res.status(200).send({
        message: 'Lupo atualizado com sucesso!'
      })
    } catch (e) {
      res.status(500).send({
        message: e
      })
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
export default handler
