import nc from 'next-connect'
import Usuario from '../../../models/Usuario'
import dbConnect from '../../../utils/dbConnect'

dbConnect()
let userid
const handler = nc()

handler
  .use((req, res, next) => {
    userid = req.query.id
    console.log('executou [id].tsx')
    next()
  })
  .get(async (req, res) => {
    try {
      const data = await Usuario.findById(userid)
      res.status(200).send(data)
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  })
  .put(async (req, res, next) => {
    try {
      await Usuario.findByIdAndUpdate(userid, {
        $set: {
          nome: req.body.nome
        }
      })
      res.status(200).send({
        message: 'Usuario atualizado com sucesso!'
      })
    } catch (e) {
      res.status(500).send({
        message: e
      })
    }
  })
  .delete(async (req, res) => {
    try {
      await Usuario.findByIdAndRemove(userid)
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
