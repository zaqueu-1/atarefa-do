const darkToggle = document.querySelector("#change-theme")

const loadTheme = () => {
  const isDark = localStorage.getItem("darkMode") === "true"
  if (isDark) {
    document.body.classList.add("dark")
    if (darkToggle) darkToggle.checked = true
  }
}

const saveTheme = (isDark) => {
  localStorage.setItem("darkMode", isDark)
}

if (darkToggle) {
  darkToggle.addEventListener("change", () => {
    const isDark = document.body.classList.toggle("dark")
    saveTheme(isDark)
  })
}

loadTheme()
