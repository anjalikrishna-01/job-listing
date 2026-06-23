import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

// Attach the JWT (stored inside the user object in localStorage) to every request
api.interceptors.request.use((config) => {
  const saved = localStorage.getItem('vantage_user')
  if (saved) {
    try {
      const user = JSON.parse(saved)
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`
      }
    } catch {
      // ignore corrupt value
    }
  }
  return config
})

export default api
