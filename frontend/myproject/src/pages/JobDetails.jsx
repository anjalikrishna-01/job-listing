import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getJobById, getSimilarJobs, relativePosted, formatSalary } from '../data/jobs.js'
import JobCard from '../components/JobCard.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../services/api.js'
import {
  MapPinIcon, BriefcaseIcon, ClockIcon, DollarIcon,
  CheckIcon, ChevronRightIcon,
} from '../components/icons.jsx'

export default function JobDetails() {
  const { id } = useParams()
  const job = getJobById(id)
  const { isAuthenticated } = useAuth()
  const [applied, setApplied] = useState(false)
  const [applying, setApplying] = useState(false)
  const [applyError, setApplyError] = useState('')
  const [realJobId, setRealJobId] = useState(null)

  // The page above still displays from the local mock file (data/jobs.js),
  // but the backend has its own real MongoDB _id for each job. We look that
  // real id up here via the /legacy lookup route so the Apply button posts
  // a valid ObjectId, not the mock "vtg-014" style id.
  useEffect(() => {
    if (!id) return
    api.get(`/jobs/legacy/${id}`)
      .then((res) => setRealJobId(res.data._id))
      .catch(() => setRealJobId(null))
  }, [id])

  if (!job) {
    return (
      <div className="container section">
        <div className="empty-state">
          <h3>Role not found</h3>
          <p>This listing may have closed or moved. Browse the current index instead.</p>
          <Link className="btn btn-primary" to="/jobs">Browse all roles</Link>
        </div>
      </div>
    )
  }

  const similar = getSimilarJobs(job)

  async function handleApply() {
    setApplyError('')

    if (!realJobId) {
      setApplyError('This role could not be matched to the database yet. Try again in a moment.')
      return
    }

    setApplying(true)
    try {
      await api.post('/applications', { jobId: realJobId })
      setApplied(true)
    } catch (err) {
      setApplyError(err.response?.data?.message || 'Something went wrong submitting your application.')
    } finally {
      setApplying(false)
    }
  }

  return (
    <div className="container section">
      <Link to="/jobs" className="back-link mono">← Back to all roles</Link>

      <div className="job-details-header">
        <div className="job-card-logo job-details-logo" style={{ background: job.logo }}>
          {job.company.charAt(0)}
        </div>
        <div>
          <div className="job-details-badges">
            <span className={`badge ${job.status === 'open' ? 'badge-open' : 'badge-closed'}`}>
              <span className="badge-dot" /> {job.status === 'open' ? 'Open' : 'Closed'}
            </span>
            {job.featured && <span className="badge badge-featured">Featured</span>}
            <span className="mono job-details-id">REF #{job.id.split('-')[1]}</span>
          </div>
          <h1 style={{ fontSize: '2rem', marginTop: 8 }}>{job.title}</h1>
          <p className="job-details-company">{job.company}</p>
        </div>
      </div>

      <div className="job-details-meta mono">
        <span><MapPinIcon size={15} /> {job.location}{job.remote ? ' · Remote-friendly' : ''}</span>
        <span><BriefcaseIcon size={15} /> {job.type} · {job.level}</span>
        <span><DollarIcon size={15} /> {formatSalary(job)}</span>
        <span><ClockIcon size={15} /> Posted {relativePosted(job.posted)}</span>
      </div>

      <div className="job-details-layout">
        <div className="job-details-main">
          <section>
            <h3>About this role</h3>
            <p>{job.description}</p>
          </section>

          <section>
            <h3>What you'll do</h3>
            <ul className="check-list">
              {job.responsibilities.map((r) => (
                <li key={r}><CheckIcon size={15} /> {r}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3>What we're looking for</h3>
            <ul className="check-list">
              {job.requirements.map((r) => (
                <li key={r}><CheckIcon size={15} /> {r}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Tags</h3>
            <div className="job-card-tags">
              {job.tags.map((t) => <span key={t} className="job-card-tag">{t}</span>)}
            </div>
          </section>
        </div>

        <aside className="job-details-aside">
          <div className="apply-card">
            <span className="mono apply-card-salary">{formatSalary(job)}</span>
            <p className="apply-card-sub">{job.type} · {job.location}</p>

            {job.status !== 'open' ? (
              <button className="btn btn-outline btn-block" disabled>Role closed</button>
            ) : applied ? (
              <div className="apply-confirm">
                <CheckIcon size={16} /> Application sent
              </div>
            ) : (
              <button
                className="btn btn-primary btn-block"
                onClick={isAuthenticated ? handleApply : undefined}
                disabled={applying || !isAuthenticated}
              >
                {applying ? 'Submitting' : isAuthenticated ? 'Apply now' : 'Log in to apply'}
                {applying && <span className="loading-dots" />}
              </button>
            )}
            {!isAuthenticated && job.status === 'open' && !applied && (
              <p className="field-hint" style={{ marginTop: 10 }}>
                <Link to="/login" style={{ color: 'var(--color-brass-dark)', fontWeight: 600 }}>Log in</Link> or{' '}
                <Link to="/register" style={{ color: 'var(--color-brass-dark)', fontWeight: 600 }}>create an account</Link> to apply.
              </p>
            )}
            {applyError && (
              <p className="field-hint" style={{ marginTop: 10, color: 'var(--color-danger, #c0392b)' }}>
                {applyError}
              </p>
            )}

            <div className="apply-card-divider" />
            <h5>About {job.company}</h5>
            <p className="field-hint">Vetted Vantage employer · {job.category} sector</p>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="section-tight">
          <div className="section-head">
            <h2 style={{ fontSize: '1.5rem' }}>Similar roles</h2>
            <Link to="/jobs" className="btn-ghost">
              See all <ChevronRightIcon size={15} />
            </Link>
          </div>
          <div className="job-grid">
            {similar.map((j, i) => <JobCard job={j} index={i + 1} key={j.id} />)}
          </div>
        </section>
      )}
    </div>
  )
}
