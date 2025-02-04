const API_URL = "http://localhost:5000/api"

// Verifica se já está autenticado
const checkAuth = () => {
  const token = localStorage.getItem("token")
  const currentPage = window.location.pathname

  // Se não estiver autenticado
  if (!token) {
    // Se não estiver em uma página de autenticação, redireciona para login
    if (
      !currentPage.includes("login.html") &&
      !currentPage.includes("register.html")
    ) {
      window.location.href = "/login.html"
      return
    }
  } else {
    // Se estiver autenticado e tentar acessar páginas de auth, redireciona para index
    if (
      currentPage.includes("login.html") ||
      currentPage.includes("register.html")
    ) {
      window.location.href = "/index.html"
      return
    }
  }
}

// Executa verificação de autenticação quando a página carrega
document.addEventListener("DOMContentLoaded", checkAuth)

// Função para mostrar mensagem de erro
const showError = (message) => {
  const errorDiv = document.createElement("div")
  errorDiv.classList.add("error-message")
  errorDiv.textContent = message

  const form = document.querySelector("form")
  const existingError = document.querySelector(".error-message")

  if (existingError) {
    existingError.remove()
  }

  form.insertAdjacentElement("afterend", errorDiv)
}

// Formulário de Login
const loginForm = document.getElementById("login-form")
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao fazer login")
      }

      // Salva o token e redireciona
      localStorage.setItem("token", data.token)
      localStorage.setItem("userName", data.name)
      window.location.href = "/index.html"
    } catch (error) {
      showError(error.message)
    }
  })
}

// Formulário de Registro
const registerForm = document.getElementById("register-form")
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao registrar usuário")
      }

      // Salva o token e redireciona
      localStorage.setItem("token", data.token)
      localStorage.setItem("userName", data.name)
      window.location.href = "/index.html"
    } catch (error) {
      showError(error.message)
    }
  })
}
