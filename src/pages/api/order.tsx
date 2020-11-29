import nc from 'next-connect'

function onError(err, req, res, next) {
  // console.log(`---------${err}`)
  res.status(500).end(err.toString())
  // OR: you may want to continue

  // next()
}

const handler = nc({ onError })

handler
  .use((req, res, next) => {
    console.log('req')
    next()
  })
  .get((req, res) => {
    res.send('Hello world')
  })
  .post((req, res) => {
    res.json({ hello: 'world' })
  })
  .put(async (req, res, next) => {
    next(Error('oh no'))
    // res.end('async/await is also supported!')
  })
  .delete(async (req, res) => {
    res.end('delete tambem e possivel')
  })
  .patch(async (req, res) => {
    throw new Error('Throws me around! Error can be caught and handled.')
  })

export default handler
