import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="navbar-brand" style={{ color: 'var(--color-paper)' }}>
            <span className="navbar-brand-mark">V</span>
            <span className="navbar-brand-name">Vantage</span>
          </div>
          <p>A curated index of premium roles for professionals who mean business.</p>
        </div>

        <div className="footer-col">
          <h4>For candidates</h4>
          <Link to="/jobs">Browse roles</Link>
          <Link to="/register">Create an account</Link>
          <Link to="/dashboard">Your applications</Link>
        </div>

        <div className="footer-col">
          <h4>For employers</h4>
          <Link to="/register">Post a role</Link>
          <Link to="/dashboard">Manage listings</Link>
          <Link to="/login">Employer log in</Link>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 Vantage Careers. All rights reserved.</span>
        <span className="mono">Built with the MERN stack</span>
      </div>
    </footer>
  )
}
