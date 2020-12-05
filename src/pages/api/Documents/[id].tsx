import nc from 'next-connect'
import Anexo from '../../../models/anexo'
import dbConnect from '../../../utils/dbConnect'

dbConnect()
let docid
const handler = nc()

handler
  .use((req, res, next) => {
    docid = req.query.id
    console.log('requisitando documento')
    next()
  })
  .get(async (req, res) => {
    try {
      const data = await Anexo.findById(docid)
      res.status(200).send(data)
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  })
  .delete(async (req, res) => {
    try {
      await Anexo.findByIdAndRemove(docid)
      res.status(200).send({
        message: 'Anexo removido com sucesso!'
      })
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  })

export default handler
