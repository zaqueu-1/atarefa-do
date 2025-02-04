const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5001/api"
    : "/api"

const isAuthPage = () => {
  const path = window.location.pathname
  return (
    path === "/login" ||
    path === "/login.html" ||
    path === "/register" ||
    path === "/register.html"
  )
}

const checkAuth = () => {
  const token = localStorage.getItem("token")
  const currentPath = window.location.pathname

  // Se estiver em uma página de autenticação e tiver token, redireciona para home
  if (token && isAuthPage()) {
    window.location.replace("/")
    return
  }

  // Se não estiver em uma página de autenticação e não tiver token, redireciona para login
  if (!token && !isAuthPage()) {
    window.location.replace("/login")
    return
  }
}

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

const loginForm = document.getElementById("login-form")
if (loginForm) {
  // Se tiver token na página de login, redireciona para home
  const token = localStorage.getItem("token")
  if (token) {
    window.location.replace("/")
  }

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

      localStorage.setItem("token", data.token)
      localStorage.setItem("userName", data.name)
      window.location.replace("/")
    } catch (error) {
      showError(error.message)
    }
  })
}

const registerForm = document.getElementById("register-form")
if (registerForm) {
  // Se tiver token na página de registro, redireciona para home
  const token = localStorage.getItem("token")
  if (token) {
    window.location.replace("/")
  }

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

      localStorage.setItem("token", data.token)
      localStorage.setItem("userName", data.name)
      window.location.replace("/")
    } catch (error) {
      showError(error.message)
    }
  })
}
