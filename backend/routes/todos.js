const router = require("express").Router()
const Todo = require("../models/Todo")
const authMiddleware = require("../middlewares/authMiddleware")

router.use(authMiddleware)

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    })
    res.json(todos)
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar todos" })
  }
})

router.post("/", async (req, res) => {
  try {
    const { text } = req.body
    const todo = await Todo.create({
      text,
      createdBy: req.user._id,
    })
    res.status(201).json(todo)
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar todo" })
  }
})

router.patch("/:id/toggle", async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    })

    if (!todo) {
      return res.status(404).json({ error: "Todo não encontrado" })
    }

    todo.done = !todo.done
    await todo.save()
    res.json(todo)
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar status do todo" })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const { text } = req.body
    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user._id,
      },
      { text },
      { new: true },
    )

    if (!todo) {
      return res.status(404).json({ error: "Todo não encontrado" })
    }

    res.json(todo)
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar todo" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    })

    if (!todo) {
      return res.status(404).json({ error: "Todo não encontrado" })
    }

    res.status(204).end()
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar todo" })
  }
})

module.exports = router
