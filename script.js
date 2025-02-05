const darkToggle = document.querySelector("#change-theme")

const API_URL = "/api/tasks"

const getHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`,
})

const loadTodos = async () => {
  try {
    const todos = await getTodos()
    const todoList = document.querySelector("#todo-list")
    todoList.innerHTML = "" // Limpa a lista antes de adicionar

    if (!todos || todos.length === 0) {
      todoList.innerHTML =
        "<p style='text-align: center; padding: 1rem;'>Nenhuma tarefa encontrada</p>"
      return
    }

    todos.forEach((todo) => {
      const todoElement = document.createElement("div")
      todoElement.classList.add("todo")
      todoElement.dataset.id = todo._id

      const todoTitle = document.createElement("h3")
      todoTitle.innerText = todo.text
      todoElement.appendChild(todoTitle)

      const doneBtn = document.createElement("button")
      doneBtn.classList.add("finish-todo")
      doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
      todoElement.appendChild(doneBtn)

      const editBtn = document.createElement("button")
      editBtn.classList.add("edit-todo")
      editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
      todoElement.appendChild(editBtn)

      const deleteBtn = document.createElement("button")
      deleteBtn.classList.add("remove-todo")
      deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
      todoElement.appendChild(deleteBtn)

      if (todo.done) {
        todoElement.classList.add("done")
      }

      todoList.appendChild(todoElement)
    })
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error)
  }
}

const getTodos = async () => {
  try {
    console.log("Iniciando busca de tarefas...")
    const response = await fetch(API_URL, {
      method: "GET",
      headers: getHeaders(),
    })

    console.log("Status da resposta:", response.status)

    if (!response.ok) {
      throw new Error(`Erro ao carregar tarefas: ${response.status}`)
    }

    const data = await response.json()
    console.log("Tarefas carregadas:", data)
    return data
  } catch (error) {
    console.error("Erro detalhado:", error)
    if (error.message.includes("401")) {
      localStorage.removeItem("token")
      window.location.replace("/login")
    }
    return []
  }
}

const createTodo = async (text) => {
  try {
    console.log("Criando nova tarefa:", text)
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ text }),
    })

    console.log("Status da resposta:", response.status)

    if (!response.ok) {
      throw new Error(`Erro ao criar tarefa: ${response.status}`)
    }

    const data = await response.json()
    console.log("Tarefa criada:", data)
    return data
  } catch (error) {
    console.error("Erro ao criar tarefa:", error)
    return null
  }
}

// Inicialização
if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html"
) {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      console.log("Iniciando carregamento da página...")
      const token = localStorage.getItem("token")

      if (!token) {
        console.log("Token não encontrado, redirecionando...")
        window.location.replace("/login")
        return
      }

      console.log("Carregando preferências e tarefas...")
      await loadUserPreferences()
      await loadTodos()

      // Adiciona listeners após carregar as tarefas
      setupEventListeners()
    } catch (error) {
      console.error("Erro na inicialização:", error)
    }
  })
}

const setupEventListeners = () => {
  const todoForm = document.querySelector("#todo-form")
  const todoInput = document.querySelector("#todo-input")

  if (todoForm) {
    todoForm.addEventListener("submit", async (e) => {
      e.preventDefault()
      const text = todoInput.value.trim()

      if (text) {
        console.log("Submetendo nova tarefa:", text)
        const todo = await createTodo(text)
        if (todo) {
          console.log("Tarefa criada, recarregando lista...")
          todoInput.value = ""
          await loadTodos() // Recarrega a lista completa
        }
      }
    })
  }

  // ... resto do código de event listeners ...
}
