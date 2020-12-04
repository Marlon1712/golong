import nc from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import Usuario from '../../../models/Usuario'

dbConnect()

const handler = nc()

handler
  .get(async (req, res) => {
    try {
      const data = await Usuario.find({})
      res.status(200).send(data)
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  })
  .post(async (req, res) => {
    try {
      const usuario = new Usuario(req.body)
      await usuario.save()
      res.status(200).send({
        message: 'Usuario cadastrado com sucesso'
      })
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  })
  .put(async (req, res, next) => {
    try {
      await Usuario.findOneAndUpdate(
        { idambev: req.body.idambev },
        {
          $set: {
            nome: req.body.nome
          }
        }
      )
      res.status(200).send({
        message: 'Usuario atualizado com sucesso!'
      })
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  })
  .delete(async (req, res) => {
    try {
      await Usuario.findOneAndRemove({ idambev: req.body.idambev })
      res.status(200).send({
        message: 'Usuario removido com sucesso!'
      })
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  })

export default handler
