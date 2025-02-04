const mongoose = require("mongoose")
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

if (!dbUser || !dbPass) {
  console.error("Erro: Credenciais do MongoDB não configuradas no arquivo .env")
  process.exit(1)
}

const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPass}@cluster0.bpxvj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    )
    console.log("Conectado ao MongoDB!")
    return dbConn
  } catch (err) {
    console.log("Erro ao conectar ao MongoDB:", err)
    process.exit(1)
  }
}

module.exports = conn