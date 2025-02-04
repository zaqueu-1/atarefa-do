const darkToggle = document.querySelector("#change-theme")

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5001"
    : "https://atarefa-do.vercel.app"
const API_URL = `${API_BASE_URL}/api/tasks`
