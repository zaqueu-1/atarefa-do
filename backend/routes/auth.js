const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

// Registro
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Verifica se usuário já existe
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ error: "Email já cadastrado" })
    }

    // Cria hash da senha
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Cria usuário
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    // Gera token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    })
  } catch (error) {
    res.status(400).json({ error: "Erro ao registrar usuário" })
  }
})

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Verifica se usuário existe
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" })
    }

    // Verifica senha
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Senha inválida" })
    }

    // Gera token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    })

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    })
  } catch (error) {
    res.status(400).json({ error: "Erro ao fazer login" })
  }
})

module.exports = router
