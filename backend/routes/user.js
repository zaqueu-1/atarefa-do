const router = require("express").Router()
const authMiddleware = require("../middlewares/authMiddleware")
const User = require("../models/User")

// Obter preferências do usuário
router.get("/preferences", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" })
    }
    res.json({ darkMode: user.darkMode })
  } catch (error) {
    res.status(400).json({ error: "Erro ao obter preferências do usuário" })
  }
})

// Atualizar preferência de modo escuro
router.patch("/dark-mode", authMiddleware, async (req, res) => {
  try {
    const { darkMode } = req.body
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { darkMode },
      { new: true },
    )

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" })
    }

    res.json({ darkMode: user.darkMode })
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar preferência de modo escuro" })
  }
})

module.exports = router
