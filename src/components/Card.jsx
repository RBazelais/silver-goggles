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

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCreators } from "../supabaseClient";
import "./Card.css";

const ShowCreators = () => {
	const [creators, setCreators] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		fetchCreators();
	}, []);

	const fetchCreators = async () => {
		try {
			setLoading(true);
			const { data, error } = await getCreators();

			if (error) {
				setError(error);
			} else {
				setCreators(data || []);
			}
		} catch (err) {
			setError("Failed to load creators");
			console.error("Error fetching creators:", err);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="page-container">
				<div className="loading-container">
					<div className="loading-spinner"></div>
					<p>Loading creators...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="page-container">
				<div className="error-container">
					<h2>Error Loading Creators</h2>
					<p>{error}</p>
					<button onClick={fetchCreators} className="nav-button">
						Try Again
					</button>
				</div>
			</div>
		);
	}

	if (creators.length === 0) {
		return (
			<div className="page-container">
				<div className="no-creators-text">
					<h2 style={{ color: "white", marginBottom: "1rem" }}>
						NO CREATORS YET 😊
					</h2>
					<p>Be the first to add a creator to the CreatorVerse!</p>
					<Link
						to="/new"
						className="nav-button"
						style={{ marginTop: "2rem" }}
					>
						Add First Creator
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="page-container">
			<div className="creators-grid">
				{creators.map((creator) => (
					<div key={creator.id} className="creator-card">
						<img
							src={creator.image}
							alt={creator.name}
							className="creator-image"
							onError={(e) => {
								e.target.src =
									"https://via.placeholder.com/320x240/1a1a1a/ffffff?text=Image+Not+Found";
							}}
						/>

						<div className="creator-content">
							<div className="creator-header">
								<h3 className="creator-name">{creator.name}</h3>
								<div className="creator-actions">
									<Link
										to={`/creator/${creator.id}`}
										className="action-icon"
										title="View Details"
									>
										ℹ️
									</Link>
									<Link
										to={`/creator/${creator.id}/edit`}
										className="action-icon"
										title="Edit Creator"
									>
										✏️
									</Link>
								</div>
							</div>

							<p className="creator-description">
								{creator.description}
							</p>

							<div className="creator-socials">
								{creator.youtube && (
									<a
										href={`https://youtube.com/@${creator.youtube}`}
										target="_blank"
										rel="noopener noreferrer"
										className="social-icon youtube-icon"
										title="YouTube"
									>
										📺
									</a>
								)}
								{creator.twitter && (
									<a
										href={`https://twitter.com/${creator.twitter}`}
										target="_blank"
										rel="noopener noreferrer"
										className="social-icon twitter-icon"
										title="Twitter"
									>
										🐦
									</a>
								)}
								{creator.instagram && (
									<a
										href={`https://instagram.com/${creator.instagram}`}
										target="_blank"
										rel="noopener noreferrer"
										className="social-icon instagram-icon"
										title="Instagram"
									>
										📷
									</a>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ShowCreators;
