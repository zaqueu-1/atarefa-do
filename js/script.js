const darkToggle = document.querySelector("#change-theme")

const API_BASE_URL = window.BACKEND_URL || "http://localhost:5001"
const API_URL = `${API_BASE_URL}/api/tasks`

const getHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`,
})

const checkAuth = () => {
  const token = localStorage.getItem("token")
  if (!token) {
    window.location.replace("/login")
    return false
  }
  return true
}

const updateDarkModePreference = async (isDarkMode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/dark-mode`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ darkMode: isDarkMode }),
    })
    if (!response.ok) {
      throw new Error("Erro ao atualizar preferência de modo escuro")
    }
    localStorage.setItem("darkMode", isDarkMode)
  } catch (error) {
    throw error
  }
}

const loadUserPreferences = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/preferences`, {
      headers: getHeaders(),
    })
    if (!response.ok) {
      throw new Error("Erro ao carregar preferências do usuário")
    }
    const data = await response.json()
    const isDark = data.darkMode

    localStorage.setItem("darkMode", isDark)

    if (isDark) {
      document.body.classList.add("dark")
      darkToggle.checked = true
    } else {
      document.body.classList.remove("dark")
      darkToggle.checked = false
    }
  } catch (error) {
    const isDark = localStorage.getItem("darkMode") === "true"
    if (isDark) {
      document.body.classList.add("dark")
      darkToggle.checked = true
    }
  }
}

if (darkToggle) {
  darkToggle.addEventListener("change", async () => {
    const isDarkMode = document.body.classList.toggle("dark")
    await updateDarkModePreference(isDarkMode)
  })
}

document.addEventListener("DOMContentLoaded", async () => {
  const isAuthenticated = await checkAuth()
  if (!isAuthenticated) return

  await loadUserPreferences()

  const todoForm = document.querySelector("#todo-form")
  const todoInput = document.querySelector("#todo-input")
  const todoList = document.querySelector("#todo-list")
  const editForm = document.querySelector("#edit-form")
  const editInput = document.querySelector("#edit-input")
  const cancelEditBtn = document.querySelector("#cancel-edit-btn")
  const searchInput = document.querySelector("#search-input")
  const eraseBtn = document.querySelector("#erase-button")
  const filterBtn = document.querySelector("#filter-select")
  let oldInputValue

  const getTodos = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: getHeaders(),
      })
      if (!response.ok) {
        throw new Error("Sessão expirada")
      }
      return await response.json()
    } catch (error) {
      if (error.message === "Sessão expirada") {
        localStorage.removeItem("token")
        window.location.replace("/login")
      }
      return []
    }
  }

  const createTodo = async (text) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ text }),
      })
      if (!response.ok) {
        throw new Error("Sessão expirada")
      }
      return await response.json()
    } catch (error) {
      if (error.message === "Sessão expirada") {
        localStorage.removeItem("token")
        window.location.replace("/login")
      }
      return null
    }
  }

  const updateTodoStatus = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/toggle`, {
        method: "PATCH",
        headers: getHeaders(),
      })
      if (!response.ok) {
        throw new Error("Sessão expirada")
      }
      return await response.json()
    } catch (error) {
      if (error.message === "Sessão expirada") {
        localStorage.removeItem("token")
        window.location.replace("/login")
      }
      return null
    }
  }

  const updateTodoText = async (id, text) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ text }),
      })
      if (!response.ok) {
        throw new Error("Sessão expirada")
      }
      return await response.json()
    } catch (error) {
      if (error.message === "Sessão expirada") {
        localStorage.removeItem("token")
        window.location.replace("/login")
      }
      return null
    }
  }

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      })
      if (!response.ok && response.status !== 204) {
        throw new Error("Sessão expirada")
      }
      return true
    } catch (error) {
      if (error.message === "Sessão expirada") {
        localStorage.removeItem("token")
        window.location.replace("/login")
      }
      return false
    }
  }

  const saveTodo = async (text) => {
    const todo = await createTodo(text)
    if (todo) {
      const todoElement = document.createElement("div")
      todoElement.classList.add("todo")
      todoElement.dataset.id = todo._id

      const todoTitle = document.createElement("h3")
      todoTitle.innerText = text
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

      todoList.insertBefore(todoElement, todoList.firstChild)
      todoInput.value = ""
    }
  }

  const updateTodo = async (text) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach(async (todoElement) => {
      let todoTitle = todoElement.querySelector("h3")

      if (todoTitle.innerText === oldInputValue) {
        const id = todoElement.dataset.id
        const updatedTodo = await updateTodoText(id, text)
        if (updatedTodo) {
          todoTitle.innerText = text
        }
      }
    })
  }

  const getSearchedTodos = (search) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
      const todoTitle = todo.querySelector("h3").innerText

      if (!todoTitle.includes(search)) {
        todo.style.display = "none"
      }

      if (todoTitle.toUpperCase().includes(search)) {
        todo.style.display = "flex"
      }
    })
  }

  const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
  }

  const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo")

    switch (filterValue) {
      case "all":
        todos.forEach((todo) => (todo.style.display = "flex"))
        break

      case "done":
        todos.forEach((todo) =>
          todo.classList.contains("done")
            ? (todo.style.display = "flex")
            : (todo.style.display = "none"),
        )
        break

      case "todo":
        todos.forEach((todo) =>
          !todo.classList.contains("done")
            ? (todo.style.display = "flex")
            : (todo.style.display = "none"),
        )
        break

      default:
        break
    }
  }

  //events
  todoForm.addEventListener("submit", (e) => {
    const inputValue = todoInput.value.trim()
    e.preventDefault()

    if (inputValue) {
      saveTodo(inputValue)
    }
  })

  document.addEventListener("click", async (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest("div")
    let todoTitle

    if (parentEl && parentEl.querySelector("h3")) {
      todoTitle = parentEl.querySelector("h3").innerText || ""
    }

    if (targetEl.classList.contains("finish-todo")) {
      const id = parentEl.dataset.id
      const updatedTodo = await updateTodoStatus(id)
      if (updatedTodo) {
        parentEl.classList.toggle("done")
      }
    }

    if (targetEl.classList.contains("remove-todo")) {
      const id = parentEl.dataset.id
      const success = await deleteTodo(id)
      if (success) {
        parentEl.remove()
      }
    }

    if (targetEl.classList.contains("edit-todo")) {
      toggleForms()
      editInput.value = todoTitle
      oldInputValue = todoTitle
    }
  })

  cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault()
    toggleForms()
  })

  editForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const editInputValue = editInput.value.trim()

    if (editInputValue) {
      updateTodo(editInputValue)
    }

    toggleForms()
  })

  searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value.trim().toUpperCase()
    getSearchedTodos(search)
  })

  eraseBtn.addEventListener("click", (e) => {
    e.preventDefault()
    searchInput.value = ""
    searchInput.dispatchEvent(new Event("keyup"))
  })

  filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value
    filterTodos(filterValue)
  })

  const loadTodos = async () => {
    const todos = await getTodos()
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
  }

  addLogoutButton = () => {
    const header = document.querySelector("header")
    const userName = localStorage.getItem("userName")

    const existingUserInfo = header.querySelector(".user-info")
    if (existingUserInfo) {
      existingUserInfo.remove()
    }

    const userDiv = document.createElement("div")
    userDiv.classList.add("user-info")
    userDiv.innerHTML = `
      <span class="welcome-text">Olá, <i>${userName}!</i></span>
      <button id="logout-btn" class="logout-button">
        <i class="fas fa-sign-out-alt"></i> Sair
      </button>
    `

    header.appendChild(userDiv)

    document.getElementById("logout-btn").addEventListener("click", () => {
      localStorage.removeItem("token")
      localStorage.removeItem("userName")
      window.location.replace("/login")
    })
  }

  addLogoutButton()
  await loadTodos()
})
