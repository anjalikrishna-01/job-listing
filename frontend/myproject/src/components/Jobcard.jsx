import { Link } from 'react-router-dom'
import { MapPinIcon, BriefcaseIcon, ClockIcon, ArrowRightIcon } from './icons.jsx'
import { relativePosted, formatSalary } from '../data/jobs.js'

export default function JobCard({ job, index }) {
  const indexLabel = String(index ?? 0).padStart(2, '0')

  return (
    <article className="job-card">
      <div className="job-card-index mono">No. {job.id.split('-')[1]}</div>

      <div className="job-card-top">
        <div className="job-card-logo" style={{ background: job.logo }}>
          {job.company.charAt(0)}
        </div>
        <span className={`badge ${job.status === 'open' ? 'badge-open' : 'badge-closed'}`}>
          <span className="badge-dot" /> {job.status === 'open' ? 'Open' : 'Closed'}
        </span>
      </div>

      <h3 className="job-card-title">
        <Link to={`/jobs/${job.id}`}>{job.title}</Link>
      </h3>
      <p className="job-card-company">{job.company}</p>

      <div className="job-card-meta mono">
        <span><MapPinIcon size={14} /> {job.location}</span>
        <span><BriefcaseIcon size={14} /> {job.type}</span>
        <span><ClockIcon size={14} /> {relativePosted(job.posted)}</span>
      </div>

      <div className="job-card-foot">
        <span className="job-card-salary mono">{formatSalary(job)}</span>
        <Link to={`/jobs/${job.id}`} className="job-card-link">
          View role <ArrowRightIcon size={14} />
        </Link>
      </div>

      <div className="job-card-tags">
        {job.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="job-card-tag">{tag}</span>
        ))}
      </div>
    </article>
  )
}
