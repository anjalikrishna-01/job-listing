import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { UserIcon, BuildingIcon } from '../components/icons.jsx'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'candidate' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      await register(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-panel auth-panel-dark">
        <span className="eyebrow">Join the index</span>
        <h2>A smaller pool. A better signal.</h2>
        <p className="auth-panel-quote">
          "We filled a senior role in eleven days with candidates who had already
          self-selected for the kind of work we do."
        </p>
        <p className="auth-panel-quote-attr mono">— Hearth & Co, Talent Lead</p>
      </div>

      <div className="auth-panel auth-panel-form">
        <div className="auth-form-wrap">
          <h2>Create your account</h2>
          <p className="field-hint" style={{ marginBottom: 24 }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--color-brass-dark)', fontWeight: 600 }}>Log in</Link>
          </p>

          <div className="role-toggle">
            <button
              type="button"
              className={`role-option ${form.role === 'candidate' ? 'is-active' : ''}`}
              onClick={() => update('role', 'candidate')}
            >
              <UserIcon size={17} /> I'm looking for work
            </button>
            <button
              type="button"
              className={`role-option ${form.role === 'employer' ? 'is-active' : ''}`}
              onClick={() => update('role', 'employer')}
            >
              <BuildingIcon size={17} /> I'm hiring
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name" type="text" className="input" placeholder="Jordan Patel"
                value={form.name} onChange={(e) => update('name', e.target.value)} required
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email" type="email" className="input" placeholder="you@company.com"
                value={form.email} onChange={(e) => update('email', e.target.value)} required
              />
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="password">Password</label>
                <input
                  id="password" type="password" className="input" placeholder="••••••••"
                  value={form.password} onChange={(e) => update('password', e.target.value)} required
                />
              </div>
              <div className="field">
                <label htmlFor="confirm">Confirm password</label>
                <input
                  id="confirm" type="password" className="input" placeholder="••••••••"
                  value={form.confirm} onChange={(e) => update('confirm', e.target.value)} required
                />
              </div>
            </div>

            {error && <p className="field-error" style={{ marginBottom: 14 }}>{error}</p>}

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Creating account' : 'Create account'}
              {loading && <span className="loading-dots" />}
            </button>
            <p className="field-hint" style={{ marginTop: 14, textAlign: 'center' }}>
              By continuing you agree to Vantage's Terms and Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
