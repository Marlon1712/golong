import mongoose from 'mongoose'
async function dbConnect() {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function callback() {
    console.log('h')
  })
}

export default dbConnect