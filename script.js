const darkToggle = document.querySelector("#change-theme")

const API_BASE_URL = ""
const API_URL = `${API_BASE_URL}/api/tasks`

const getHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`,
})

if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html"
) {
  document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.replace("/login")
      return
    }

    await loadUserPreferences()
  })
}
