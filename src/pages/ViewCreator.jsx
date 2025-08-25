// TODO (priority-ordered checklist):
// 1) Display at least five content creators on the homepage (implement `ShowCreators` and render a list of >=5 items).
// 2) Each creator item must include: name, a link to their channel/page (open in new tab), and a short description.
// 3) All API calls must use async/await (use `fetch` or `axios`); centralize API calls in a data layer or use `src/client.js`.
// 4) Clicking a creator navigates to a detail page with a unique URL (`/creators/:id`) showing name, url, and description (implement `ViewCreator`).
// 5) Provide edit functionality (`EditCreator`) to change name, url, or description; persist changes via API and reflect updates in the list.
// 6) Provide delete functionality with confirmation; after delete, remove the creator from the list and navigate appropriately.
// 7) Add new creators via `AddCreator` (name, url, description); after successful add, ensure the new creator appears in the homepage list.
// 8) Use optimistic UI updates or re-fetch the list after create/edit/delete to keep the UI in sync.
// 9) Move sensitive keys (Supabase or other) to environment variables and never commit them; use `src/client.js` as a lightweight wrapper.
// 10) Add loading, error, and empty states for all list/detail pages and form submissions; add client-side validation for forms.
// 11) Ensure pages are accessible (keyboard focus, ARIA labels) and add `prefers-reduced-motion` support.
// 12) Add tests for the CRUD flows (unit + integration) once the routes and API layer are implemented.

// TODO ViewCreator page:
// - Implement creator detail view: large hero image, social links, description, related creators
// - Fetch creator by id from Supabase and handle loading/error states
// - Add link to edit and back to list

import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

const MOCK_API = '/api/mock-creators.json'

export default function ViewCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function fetchCreator() {
      setLoading(true)
      try {
        const res = await fetch(MOCK_API)
        if (!res.ok) throw new Error('Failed to fetch creator')
        const data = await res.json()
        const found = data.find((c) => String(c.id) === String(id))
        if (mounted) setCreator(found || null)
      } catch (err) {
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchCreator()
    return () => { mounted = false }
  }, [id])

  if (loading) return <div className="loading">Loading creator...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!creator) return <div className="empty">Creator not found. <button onClick={() => navigate('/creators')}>Back to list</button></div>

  return (
    <section className="view-creator" style={{padding: '2rem', color: 'white'}}>
      <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2>{creator.name}</h2>
        <div>
          <Link to={`/edit/${creator.id}`} className="hero-btn secondary" style={{marginRight: '1rem'}}>Edit</Link>
          <a href={creator.url} target="_blank" rel="noopener noreferrer" className="hero-btn primary">Visit</a>
        </div>
      </header>

      <div style={{marginTop: '1rem'}}>
        <img src={creator.imageUrl} alt={creator.name} style={{maxWidth: '100%', borderRadius: 8}} />
        <p style={{marginTop: '1rem'}}>{creator.description}</p>
      </div>
    </section>
  )
}
