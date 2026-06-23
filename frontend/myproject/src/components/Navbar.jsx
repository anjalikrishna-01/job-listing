import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { MenuIcon, CloseIcon, UserIcon, LogOutIcon } from './icons.jsx'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function closeMenu() { setMenuOpen(false) }

  function handleLogout() {
    logout()
    closeMenu()
    navigate('/')
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-row">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="navbar-brand-mark">V</span>
          <span className="navbar-brand-name">Vantage</span>
        </Link>

        <nav className={`navbar-links ${menuOpen ? 'is-open' : ''}`}>
          <NavLink to="/" end className="navbar-link" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/jobs" className="navbar-link" onClick={closeMenu}>Browse Jobs</NavLink>
          {isAuthenticated && (
            <NavLink to="/dashboard" className="navbar-link" onClick={closeMenu}>Dashboard</NavLink>
          )}

          <div className="navbar-divider" />

          {isAuthenticated ? (
            <div className="navbar-user">
              <span className="navbar-user-chip">
                <UserIcon size={15} /> {user.name}
              </span>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                <LogOutIcon size={15} /> Log out
              </button>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="navbar-link" onClick={closeMenu}>Log in</Link>
              <Link to="/register" className="btn btn-primary btn-sm" onClick={closeMenu}>Post a job</Link>
            </div>
          )}
        </nav>

        <button
          className="navbar-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  )
}
