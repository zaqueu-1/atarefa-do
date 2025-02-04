const darkToggle = document.querySelector("#change-theme")

const API_BASE_URL =
  window.location.hostname === "localhost" ? "http://localhost:5001" : ""
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
