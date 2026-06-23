import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchIcon, MapPinIcon } from './icons.jsx'

export default function SearchBar({ variant = 'hero', initialValues, onSearch }) {
  const [keyword, setKeyword] = useState(initialValues?.keyword || '')
  const [location, setLocation] = useState(initialValues?.location || '')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (onSearch) {
      onSearch({ keyword, location })
    } else {
      const params = new URLSearchParams()
      if (keyword) params.set('q', keyword)
      if (location) params.set('loc', location)
      navigate(`/jobs?${params.toString()}`)
    }
  }

  return (
    <form className={`searchbar searchbar-${variant}`} onSubmit={handleSubmit} role="search">
      <div className="searchbar-field">
        <SearchIcon size={17} className="searchbar-icon" />
        <input
          className="searchbar-input"
          type="text"
          placeholder="Job title, company, or keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          aria-label="Keyword"
        />
      </div>
      <div className="searchbar-divider" />
      <div className="searchbar-field">
        <MapPinIcon size={17} className="searchbar-icon" />
        <input
          className="searchbar-input"
          type="text"
          placeholder="Location or 'Remote'"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          aria-label="Location"
        />
      </div>
      <button type="submit" className="btn btn-primary searchbar-submit">Search roles</button>
    </form>
  )
}
