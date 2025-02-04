require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")

const app = express()
const PORT = process.env.PORT || 5001

// Middlewares
app.use(cors())
app.use(express.json())

// Conexão com o MongoDB
connectDB()

// Rotas
app.use("/api/auth", require("./routes/auth"))
app.use("/api/tasks", require("./routes/todos"))
app.use("/api/user", require("./routes/user"))

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
