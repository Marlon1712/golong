import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()
  // .use(someMiddleware())
  .get((req, res) => {
    res.send('Hello world')
  })
  .post((req, res) => {
    res.json({ hello: 'world' })
  })
  .put(async (req, res) => {
    res.end('async/await is also supported!')
  })
  .delete(async (req, res) => {
    res.end('delete tambem e possivel')
  })
// .patch(async (req, res) => {
//  throw new Error('Throws me around! Error can be caught and handled.')
// })

export default handler
