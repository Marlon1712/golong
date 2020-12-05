import nc from 'next-connect'
import multer from 'multer'
import mongoose from 'mongoose'
import multerConfig from '../../../config/multer'
import Anexo from '../../../models/anexo'

function onError(err, req, res, next) {
  // console.log(`---------${err}`)
  res.status(500).end(err.toString())
  // OR: you may want to continue

  // next()
}

// const upload = multer({ dest: '../../tmp' })
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const handler = nc({ onError })

handler
  .get(async (req, res) => {
    try {
      const data = await Anexo.find({})
      res.status(200).send(data)
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  })
  .post(async (req, res) => {
    try {
      const usuario = new Anexo(req.body)
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
      await Anexo.findOneAndUpdate(
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
    console.log(req.params.id)
    try {
      const anexo = await Anexo.findById(req.params.id)

      await anexo.remove()
      res.status(200).send({
        message: 'Usuario removido com sucesso!'
      })
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  })
  .patch(multer(multerConfig).single('file'), async (req, res) => {
    const { originalname: name, size, key, path: url = '' } = req.file
    const anexo = await Anexo.create({
      name,
      size,
      key,
      url
    })
    return res.json(anexo)
  })
export const config = {
  api: {
    bodyParser: false
  }
}
export default handler
