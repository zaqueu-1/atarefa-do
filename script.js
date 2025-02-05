const darkToggle = document.querySelector("#change-theme")

const API_URL = "/api/tasks"

const getHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`,
})

if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html"
) {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        window.location.replace("/login")
        return
      }

      await loadUserPreferences()
      await loadTodos()
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      if (error.message === "Sessão expirada") {
        localStorage.removeItem("token")
        window.location.replace("/login")
      }
    }
  })
}

const getTodos = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: getHeaders(),
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || "Erro ao carregar tarefas")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error)
    if (error.message.includes("Sessão expirada") || response.status === 401) {
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
      const data = await response.json()
      throw new Error(data.error || "Erro ao criar tarefa")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Erro ao criar tarefa:", error)
    if (error.message.includes("Sessão expirada") || response.status === 401) {
      localStorage.removeItem("token")
      window.location.replace("/login")
    }
    return null
  }
}
