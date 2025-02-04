const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ error: "Email já cadastrado" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

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

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Senha inválida" })
    }

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
