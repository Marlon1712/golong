import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'
import User from '../../../models/Usuario'

dbConnect()

const handler = nc<NextApiRequest, NextApiResponse>()

handler
  .get(async (req, res) => {
    try {
      const data = await User.find({})
      res.status(200).send(data)
    } catch (e) {
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      })
    }
  })
  .post(async (req, res) => {
    try {
      const user = new User(req.body)
      await user.save()
      res.status(200).send({
        message: 'USUARIO CADASTRADO COM SUCESSO'
      })
    } catch (e: any) {
      if (e.keyValue.nome) {
        res.status(200).send({
          error: `USUARIO '${e.keyValue.nome.toUpperCase()}' JA EXISTE`
        })
      } else {
        if (e.keyValue.idambev) {
          res.status(200).send({
            error: `ID '${e.keyValue.idambev}' JA CADASTRADO PARA OUTRO USUARIO`
          })
        } else {
          res.status(500).send({
            error: 'FALHA AO PROCESSAR SUA REQUISIÇÃO'
          })
        }
      }
    }
  })
  .put(async (req, res) => {
    try {
      await User.findOneAndUpdate(
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
      await User.findOneAndRemove({ idambev: req.body.idambev })
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
