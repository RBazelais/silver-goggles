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

import React, { useState } from 'react';
import './AddCreator.css';

const AddCreator = () => {
	const [formData, setFormData] = useState({
		name: '',
		image: '',
		description: '',
		youtube: '',
		twitter: '',
		instagram: ''
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
		...prev,
		[name]: value
    }));
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Add creator to database
};

// TODO AddCreator next tasks:
// - Integrate with Supabase: insert creator on submit and handle success/error
// - Add client-side validation for social handles and image URL
// - Show success toast or navigate to creators list after successful add
// - Add image preview when a valid image URL is entered
// - Disable submit button while request is in progress and provide loading state

return (
	<div className="form-container">
		<form onSubmit={handleSubmit} className="creator-form">
			<div className="form-group">
				<label htmlFor="name">Name</label>
				<input
				type="text"
				id="name"
				name="name"
				value={formData.name}
				onChange={handleChange}
				required
				/>
			</div>

			<div className="form-group">
				<label htmlFor="image">Image</label>
				<p className="form-description">
					Provide a link to an image of your creator. Be sure to include the http://
				</p>
				<input
						type="url"
						id="image"
						name="image"
						value={formData.image}
						onChange={handleChange}
						placeholder="https://example.com/image.jpg"
				/>
			</div>

			<div className="form-group">
				<label htmlFor="description">Description</label>
				<p className="form-description">
				Provide a description of the creator. Who are they? What makes them interesting?
				</p>
				<textarea
				id="description"
				name="description"
				value={formData.description}
				onChange={handleChange}
				rows="4"
				required
				/>
			</div>

			<div className="social-section">
				<h3 className="social-title">SOCIAL MEDIA LINKS</h3>
				<p className="social-description">
				Provide at least one of the creator's social media links
				</p>

				<div className="form-group">
					<label htmlFor="youtube" className="social-label">
						<span className="social-icon">📺</span>
						YouTube
					</label>
					<p className="form-description">
						The creator's YouTube handle (without the @)
					</p>
					<input
						type="text"
						id="youtube"
						name="youtube"
						value={formData.youtube}
						onChange={handleChange}
						placeholder="channelname"
					/>
					</div>

					<div className="form-group">
					<label htmlFor="twitter" className="social-label">
						<span className="social-icon">🐦</span>
						Twitter
					</label>
					<p className="form-description">
						The creator's Twitter handle (without the @)
					</p>
					<input
						type="text"
						id="twitter"
						name="twitter"
						value={formData.twitter}
						onChange={handleChange}
						placeholder="username"
					/>
					</div>

					<div className="form-group">
					<label htmlFor="instagram" className="social-label">
						<span className="social-icon">📷</span>
						Instagram
					</label>
					<p className="form-description">
						The creator's Instagram handle (without the @)
					</p>
					<input
						type="text"
						id="instagram"
						name="instagram"
						value={formData.instagram}
						onChange={handleChange}
						placeholder="username"
					/>
					</div>
				</div>

				<button type="submit" className="submit-btn">
					SUBMIT
				</button>
			</form>
		</div>
	);
};

export default AddCreator;
