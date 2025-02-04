require("dotenv").config()
const express = require("express")
const cors = require("cors")
const conn = require("./config/db.js")
const todoRoutes = require("./routes/todos")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")

const app = express()

// Conexão com o MongoDB
conn()

// Middlewares
app.use(cors())
app.use(express.json())

// Rotas
app.use("/api/auth", authRoutes)
app.use("/api/todos", todoRoutes)
app.use("/api/user", userRoutes)

// Iniciar servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
