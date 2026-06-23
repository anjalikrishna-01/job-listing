import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate(location.state?.from || '/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-panel auth-panel-dark">
        <span className="eyebrow">Welcome back</span>
        <h2>Pick up right where your search left off.</h2>
        <p className="auth-panel-quote">
          "Vantage surfaced three roles in a week that actually matched what I wanted —
          not a flood of mismatched listings."
        </p>
        <p className="auth-panel-quote-attr mono">— A. Mehta, Senior Engineer, hired via Vantage</p>
      </div>

      <div className="auth-panel auth-panel-form">
        <div className="auth-form-wrap">
          <h2>Log in</h2>
          <p className="field-hint" style={{ marginBottom: 24 }}>
            New here? <Link to="/register" style={{ color: 'var(--color-brass-dark)', fontWeight: 600 }}>Create an account</Link>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email" type="email" className="input" placeholder="you@company.com"
                value={form.email} onChange={(e) => update('email', e.target.value)} required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password" type="password" className="input" placeholder="••••••••"
                value={form.password} onChange={(e) => update('password', e.target.value)} required
              />
              <span className="field-hint">Demo tip: any email + a 6+ character password works. Include "employer" in the email to view the employer dashboard.</span>
            </div>

            {error && <p className="field-error" style={{ marginBottom: 14 }}>{error}</p>}

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Signing in' : 'Log in'}
              {loading && <span className="loading-dots" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
