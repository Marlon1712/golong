import mongoose from 'mongoose'

const connection = {
  isConnected: 0
}

async function dbConnect() {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  connection.isConnected = db.connections[0].readyState
  console.log(`Conexao com banco : ${connection.isConnected}`)
}

export default dbConnect
