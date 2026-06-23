import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { jobs, relativePosted } from '../data/jobs.js'
import { BriefcaseIcon, CheckIcon, ClockIcon, UserIcon } from '../components/icons.jsx'

const TABS = ['Overview', 'Applications', 'Listings', 'Profile']

export default function Dashboard() {
  const { user, isAuthenticated, initializing } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Overview')

  useEffect(() => {
    if (!initializing && !isAuthenticated) navigate('/login', { state: { from: '/dashboard' } })
  }, [initializing, isAuthenticated, navigate])

  if (initializing || !isAuthenticated) {
    return <div className="container section"><p className="field-hint">Loading dashboard…</p></div>
  }

  const isEmployer = user.role === 'employer'
  // Demo data slices — once the backend exists, fetch the user's real
  // applications / listings from `/api/applications` or `/api/jobs?owner=me`.
  const mockApplications = jobs.slice(0, 4)
  const mockListings = jobs.filter((j) => j.company === 'Northwind Analytics')

  return (
    <div className="container section">
      <div className="dashboard-head">
        <div>
          <span className="eyebrow">{isEmployer ? 'Employer dashboard' : 'Candidate dashboard'}</span>
          <h1 style={{ fontSize: '2rem', textTransform: 'capitalize' }}>Welcome back, {user.name}</h1>
        </div>
        <span className="badge badge-featured" style={{ textTransform: 'capitalize' }}>{user.role}</span>
      </div>

      <div className="stat-cards">
        {isEmployer ? (
          <>
            <StatCard icon={<BriefcaseIcon size={18} />} label="Active listings" value={mockListings.length} />
            <StatCard icon={<UserIcon size={18} />} label="Total applicants" value="47" />
            <StatCard icon={<ClockIcon size={18} />} label="Avg. time to fill" value="11 days" />
          </>
        ) : (
          <>
            <StatCard icon={<CheckIcon size={18} />} label="Applications sent" value={mockApplications.length} />
            <StatCard icon={<BriefcaseIcon size={18} />} label="Saved roles" value="6" />
            <StatCard icon={<UserIcon size={18} />} label="Profile views" value="23" />
          </>
        )}
      </div>

      <div className="dashboard-tabs mono">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`dashboard-tab ${activeTab === tab ? 'is-active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="dashboard-panel">
        {activeTab === 'Overview' && (
          <ul className="activity-list">
            <li><span className="activity-dot" /> {isEmployer ? 'New applicant for Senior Backend Engineer' : 'Application viewed by Northwind Analytics'} <span className="mono activity-time">2h ago</span></li>
            <li><span className="activity-dot" /> {isEmployer ? 'Frontend Engineer (React) listing renewed' : 'You saved Product Designer at Lumen Studio'} <span className="mono activity-time">1 day ago</span></li>
            <li><span className="activity-dot" /> {isEmployer ? 'Listing for Product Manager, Platform went live' : 'Profile completeness reached 90%'} <span className="mono activity-time">3 days ago</span></li>
          </ul>
        )}

        {activeTab === 'Applications' && (
          <DataTable
            rows={mockApplications}
            columns={['Role', 'Company', 'Applied', 'Status']}
            renderRow={(job) => (
              <tr key={job.id}>
                <td><Link to={`/jobs/${job.id}`}>{job.title}</Link></td>
                <td>{job.company}</td>
                <td className="mono">{relativePosted(job.posted)}</td>
                <td><span className={`badge ${job.status === 'open' ? 'badge-open' : 'badge-closed'}`}>{job.status === 'open' ? 'In review' : 'Closed'}</span></td>
              </tr>
            )}
          />
        )}

        {activeTab === 'Listings' && (
          isEmployer ? (
            <DataTable
              rows={mockListings}
              columns={['Role', 'Posted', 'Applicants', 'Status']}
              renderRow={(job) => (
                <tr key={job.id}>
                  <td><Link to={`/jobs/${job.id}`}>{job.title}</Link></td>
                  <td className="mono">{relativePosted(job.posted)}</td>
                  <td className="mono">{Math.floor(Math.random() * 30) + 4}</td>
                  <td><span className={`badge ${job.status === 'open' ? 'badge-open' : 'badge-closed'}`}>{job.status === 'open' ? 'Open' : 'Closed'}</span></td>
                </tr>
              )}
            />
          ) : (
            <div className="empty-state">
              <h3>This view is for employers</h3>
              <p>Switch to an employer account to manage job listings.</p>
            </div>
          )
        )}

        {activeTab === 'Profile' && (
          <div className="profile-card">
            <div className="field">
              <label>Full name</label>
              <input className="input" value={user.name} readOnly style={{ textTransform: 'capitalize' }} />
            </div>
            <div className="field">
              <label>Email address</label>
              <input className="input" value={user.email} readOnly />
            </div>
            <div className="field">
              <label>Account type</label>
              <input className="input" value={user.role} readOnly style={{ textTransform: 'capitalize' }} />
            </div>
            <p className="field-hint">Profile editing connects to your backend's user-update endpoint — not wired up in this demo.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon">{icon}</div>
      <div>
        <div className="stat-card-value mono">{value}</div>
        <div className="stat-card-label">{label}</div>
      </div>
    </div>
  )
}

function DataTable({ rows, columns, renderRow }) {
  if (rows.length === 0) {
    return (
      <div className="empty-state">
        <h3>Nothing here yet</h3>
        <p>Activity will show up here once it happens.</p>
      </div>
    )
  }
  return (
    <table className="data-table">
      <thead>
        <tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr>
      </thead>
      <tbody>{rows.map(renderRow)}</tbody>
    </table>
  )
}
