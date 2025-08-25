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

import React from 'react';
import './Card.css';

const Card = ({ creator }) => {
	const {
		name = "MAANGCHI",
		description = "Maangchi got famous for publishing youtube videos of herself making delicious Korean recipes. She's kind of from OG youtube. Definitely worth checking out.",
		imageUrl = "https://images.unsplash.com/photo-1494790108755-2616b9f2e5e6?auto=format&fit=crop&w=1000&q=80",
		youtubeUrl = "",
		twitterUrl = "",
		instagramUrl = ""
	} = creator || {};

	return (
		<article className="creator-card" tabIndex={0} aria-label={`Creator ${name}`}>
		<div className="card-image-container">
			<img 
			src={imageUrl} 
			alt={name}
			className="card-image"
			/>
			<div className="card-overlay">
			<div className="card-actions">
				<button className="info-btn" aria-label={`View ${name}`}>ℹ️</button>
				<button className="edit-btn" aria-label={`Edit ${name}`}>✏️</button>
			</div>
			</div>
		</div>
		
		<div className="card-content">
			<h3 className="creator-name">{name}</h3>
			
			<div className="social-links">
			{youtubeUrl && (
				<a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube">📺</a>
			)}
			{twitterUrl && (
				<a href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="Twitter">🐦</a>
			)}
			{instagramUrl && (
				<a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷</a>
			)}
			</div>
			
			<p className="creator-description">{description}</p>
		</div>
		</article>
	);
};

export default Card;
