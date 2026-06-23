import axios from 'axios'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'vantage_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [initializing, setInitializing] = useState(true)

  // Restore session on first load (demo: localStorage. In production this
  // should validate a stored JWT against the backend instead).
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try { setUser(JSON.parse(saved)) } catch { /* ignore corrupt value */ }
    }
    setInitializing(false)
  }, [])

  function persist(nextUser) {
    setUser(nextUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
  }

  // --------------------------------------------------------------------
  // MOCK login. Replace the body with:
  //   const { data } = await api.post('/auth/login', { email, password })
  //   persist(data.user)  // and store data.token separately
  // --------------------------------------------------------------------
async function login(email, password) {
  const { data } = await axios.post(
    'http://localhost:5000/api/users/login',
    {
      email,
      password,
    }
  )

  persist(data)

  return data
}

  // --------------------------------------------------------------------
  // MOCK register. Replace the body with:
  //   const { data } = await api.post('/auth/register', payload)
  //   persist(data.user)
  // --------------------------------------------------------------------
  async function register({ name, email, password, role }) {
  const { data } = await axios.post(
    'http://localhost:5000/api/users/register',
    {
      name,
      email,
      password,
      role: role === 'candidate' ? 'jobseeker' : 'employer',
    }
  )

  persist(data)
  return data
}

  function logout() {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const value = { user, isAuthenticated: !!user, initializing, login, register, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
