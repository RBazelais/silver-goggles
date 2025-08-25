import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCreators } from "../supabaseClient";
import "./ShowCreators.css";

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
					<Link
						key={creator.id}
						to={`/creator/${creator.id}`}
						className="creator-card-link"
						style={{ textDecoration: "none" }}
					>
						<div
							className="creator-card"
							style={{ backgroundImage: `url(${creator.image})` }}
						>
							{/* card-actions removed: edit icon no longer shown */}

							<div className="card-content">
								<div>
									<h3 className="creator-name">{creator.name}</h3>
									<p className="creator-description">
										{creator.description}
									</p>
								</div>

								<div className="creator-socials">
									{creator.youtube && (
										<a
											href={`https://youtube.com/@${creator.youtube}`}
											target="_blank"
											rel="noopener noreferrer"
											className="social-icon"
											title="YouTube"
											onClick={e => e.stopPropagation()}
										>
											<svg viewBox="0 0 24 24" fill="currentColor">
												<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
											</svg>
										</a>
									)}
									{creator.twitter && (
										<a
											href={`https://twitter.com/${creator.twitter}`}
											target="_blank"
											rel="noopener noreferrer"
											className="social-icon"
											title="Twitter"
											onClick={e => e.stopPropagation()}
										>
											<svg viewBox="0 0 24 24" fill="currentColor">
												<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
											</svg>
										</a>
									)}
									{creator.instagram && (
										<a
											href={`https://instagram.com/${creator.instagram}`}
											target="_blank"
											rel="noopener noreferrer"
											className="social-icon"
											title="Instagram"
											onClick={e => e.stopPropagation()}
										>
											<svg viewBox="0 0 24 24" fill="currentColor">
												<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
											</svg>
										</a>
									)}
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default ShowCreators;
