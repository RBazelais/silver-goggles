// TODO (priority-ordered checklist):
// This page implements items 1-4 of the checklist using a local mock fetch. Replace with real API calls later.

import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import './ShowCreators.css'
import { Link } from 'react-router-dom'

const MOCK_API = '/api/mock-creators.json'

export default function ShowCreators() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function fetchCreators() {
      setLoading(true)
      try {
        // Using a local mock via fetch to keep async/await pattern.
        const res = await fetch(MOCK_API)
        if (!res.ok) throw new Error('Failed to load creators')
        const data = await res.json()
        if (mounted) setCreators(data.slice(0, 10))
      } catch (err) {
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchCreators()
    return () => { mounted = false }
  }, [])

  if (loading) return <div className="loading">Loading creators...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!creators || creators.length === 0) return <div className="empty">No creators yet.</div>

  return (
    <section className="show-creators">
      <header className="show-header">
        <h2>All Creators</h2>
        <Link to="/add" className="hero-btn primary">Add Creator</Link>
      </header>

      <div className="creators-grid">
        {creators.map((c) => (
          <Link key={c.id} to={`/creators/${c.id}`} className="creator-link">
            <Card creator={{
              name: c.name,
              description: c.description,
              imageUrl: c.imageUrl,
              youtubeUrl: c.url
            }} />
          </Link>
        ))}
      </div>
    </section>
  )
}
