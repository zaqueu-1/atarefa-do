// Dark mode toggle
const darkToggle = document.querySelector("#change-theme")

// Função para carregar tema do localStorage (fallback quando não estiver logado)
const loadTheme = () => {
  const isDark = localStorage.getItem("darkMode") === "true"
  if (isDark) {
    document.body.classList.add("dark")
    if (darkToggle) darkToggle.checked = true
  }
}

// Função para salvar tema no localStorage (fallback)
const saveTheme = (isDark) => {
  localStorage.setItem("darkMode", isDark)
}

// Evento de alteração do tema
if (darkToggle) {
  darkToggle.addEventListener("change", () => {
    const isDark = document.body.classList.toggle("dark")
    saveTheme(isDark)
  })
}

// Carregar tema ao iniciar
loadTheme()
