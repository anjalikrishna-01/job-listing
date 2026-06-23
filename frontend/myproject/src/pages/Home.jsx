import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import JobCard from '../components/JobCard.jsx'
import { jobs, categories } from '../data/jobs.js'
import { ArrowRightIcon, BriefcaseIcon, BuildingIcon, ChevronRightIcon } from '../components/icons.jsx'

export default function Home() {
  const featured = jobs.filter((j) => j.featured).slice(0, 6)
  const companyCount = new Set(jobs.map((j) => j.company)).size
  const tickerItems = [...jobs, ...jobs] // duplicated for seamless loop

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Curated career index</span>
            <h1>Find work worth <em>the move.</em></h1>
            <p className="hero-lede">
              Vantage indexes a small number of well-vetted roles at companies that take
              hiring seriously — so every search starts with quality, not volume.
            </p>
            <div className="hero-search"><SearchBar variant="hero" /></div>
            <p className="hero-trust">Roles currently open at Northwind Analytics, Lumen Studio, Hearth &amp; Co and more.</p>
          </div>

          <div className="hero-ticker" aria-hidden="true">
            <span className="hero-ticker-label mono">Live index</span>
            <div className="ticker-track">
              <div className="ticker-list">
                {tickerItems.map((job, i) => (
                  <div className="ticker-row" key={job.id + i}>
                    <span className="mono ticker-id">#{job.id.split('-')[1]}</span>
                    <span className="ticker-title">{job.title}</span>
                    <span className="ticker-company">{job.company}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Stat strip ---------------- */}
      <section className="stat-strip">
        <div className="container stat-strip-row">
          <div className="stat-item">
            <span className="stat-number mono">{jobs.length}+</span>
            <span className="stat-label">Open roles</span>
          </div>
          <div className="stat-item">
            <span className="stat-number mono">{companyCount}</span>
            <span className="stat-label">Vetted companies</span>
          </div>
          <div className="stat-item">
            <span className="stat-number mono">92%</span>
            <span className="stat-label">Application response rate</span>
          </div>
          <div className="stat-item">
            <span className="stat-number mono">4.8 days</span>
            <span className="stat-label">Median time to first reply</span>
          </div>
        </div>
      </section>

      {/* ---------------- Featured jobs ---------------- */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">No. 01 — 06</span>
              <h2>Featured roles this week</h2>
            </div>
            <Link to="/jobs" className="btn btn-outline">
              View all roles <ArrowRightIcon size={15} />
            </Link>
          </div>
          <div className="job-grid">
            {featured.map((job, i) => (
              <JobCard job={job} index={i + 1} key={job.id} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Categories ---------------- */}
      <section className="section-tight categories-section">
        <div className="container">
          <span className="eyebrow">Browse by field</span>
          <h2 style={{ marginBottom: 24 }}>Eight fields, one standard.</h2>
          <div className="category-pills">
            {categories.map((cat) => (
              <Link to={`/jobs?category=${encodeURIComponent(cat)}`} className="category-pill" key={cat}>
                <BriefcaseIcon size={15} /> {cat} <ChevronRightIcon size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA band ---------------- */}
      <section className="cta-band">
        <div className="container cta-band-row">
          <div>
            <span className="eyebrow">For employers</span>
            <h2>Hiring? Reach professionals who mean business.</h2>
            <p>List a role on Vantage and reach a small, qualified pool — not an open inbox.</p>
          </div>
          <Link to="/register" className="btn btn-primary">
            <BuildingIcon size={16} /> Post a job
          </Link>
        </div>
      </section>
    </>
  )
}
