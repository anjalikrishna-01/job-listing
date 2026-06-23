import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import JobCard from '../components/JobCard.jsx'
import { jobs, categories, jobTypes, levels } from '../data/jobs.js'

const PAGE_SIZE = 6

export default function Jobs() {
  const [params, setParams] = useSearchParams()
  const [visible, setVisible] = useState(PAGE_SIZE)

  const keyword = params.get('q') || ''
  const locationQuery = params.get('loc') || ''
  const activeCategories = params.getAll('category')
  const activeTypes = params.getAll('type')
  const activeLevels = params.getAll('level')

  function updateParams(mutator) {
    const next = new URLSearchParams(params)
    mutator(next)
    setParams(next)
    setVisible(PAGE_SIZE)
  }

  function toggleListParam(key, value) {
    updateParams((next) => {
      const current = next.getAll(key)
      next.delete(key)
      if (current.includes(value)) {
        current.filter((v) => v !== value).forEach((v) => next.append(key, v))
      } else {
        ;[...current, value].forEach((v) => next.append(key, v))
      }
    })
  }

  function handleSearch({ keyword: kw, location: loc }) {
    updateParams((next) => {
      if (kw) next.set('q', kw); else next.delete('q')
      if (loc) next.set('loc', loc); else next.delete('loc')
    })
  }

  function clearFilters() {
    setParams(new URLSearchParams())
    setVisible(PAGE_SIZE)
  }

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesKeyword = !keyword ||
        job.title.toLowerCase().includes(keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(keyword.toLowerCase()) ||
        job.tags.some((t) => t.toLowerCase().includes(keyword.toLowerCase()))
      const matchesLocation = !locationQuery ||
        job.location.toLowerCase().includes(locationQuery.toLowerCase()) ||
        (locationQuery.toLowerCase() === 'remote' && job.remote)
      const matchesCategory = activeCategories.length === 0 || activeCategories.includes(job.category)
      const matchesType = activeTypes.length === 0 || activeTypes.includes(job.type)
      const matchesLevel = activeLevels.length === 0 || activeLevels.includes(job.level)
      return matchesKeyword && matchesLocation && matchesCategory && matchesType && matchesLevel
    })
  }, [keyword, locationQuery, activeCategories.join(','), activeTypes.join(','), activeLevels.join(',')])

  const visibleJobs = filtered.slice(0, visible)
  const hasMore = visible < filtered.length
  const hasActiveFilters = keyword || locationQuery || activeCategories.length || activeTypes.length || activeLevels.length

  return (
    <>
      <div className="page-header">
        <div className="container">
          <span className="eyebrow">The full index</span>
          <h1 style={{ fontSize: '2.1rem', marginBottom: 18 }}>Browse open roles</h1>
          <SearchBar variant="inline" initialValues={{ keyword, location: locationQuery }} onSearch={handleSearch} />
        </div>
      </div>

      <div className="container section">
        <div className="jobs-layout">
          <aside className="filters-panel">
            <div className="filters-head">
              <h4>Filters</h4>
              {hasActiveFilters && (
                <button className="btn-ghost mono" style={{ fontSize: '0.75rem' }} onClick={clearFilters}>
                  Clear all
                </button>
              )}
            </div>

            <FilterGroup
              title="Category"
              options={categories}
              active={activeCategories}
              onToggle={(v) => toggleListParam('category', v)}
            />
            <FilterGroup
              title="Job type"
              options={jobTypes}
              active={activeTypes}
              onToggle={(v) => toggleListParam('type', v)}
            />
            <FilterGroup
              title="Level"
              options={levels}
              active={activeLevels}
              onToggle={(v) => toggleListParam('level', v)}
            />
          </aside>

          <div className="jobs-results">
            <p className="jobs-count mono">
              Showing {visibleJobs.length} of {filtered.length} role{filtered.length !== 1 ? 's' : ''}
            </p>

            {filtered.length === 0 ? (
              <div className="empty-state">
                <h3>No roles match these filters</h3>
                <p>Try widening your search or clearing a filter.</p>
                <button className="btn btn-primary" onClick={clearFilters}>Clear all filters</button>
              </div>
            ) : (
              <>
                <div className="job-grid">
                  {visibleJobs.map((job, i) => (
                    <JobCard job={job} index={i + 1} key={job.id} />
                  ))}
                </div>
                {hasMore && (
                  <div className="load-more-row">
                    <button className="btn btn-outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                      Load more roles
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function FilterGroup({ title, options, active, onToggle }) {
  return (
    <div className="filter-group">
      <h5>{title}</h5>
      <div className="filter-options">
        {options.map((opt) => (
          <label className="filter-checkbox" key={opt}>
            <input
              type="checkbox"
              checked={active.includes(opt)}
              onChange={() => onToggle(opt)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
