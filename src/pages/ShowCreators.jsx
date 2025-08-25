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
					<div 
						key={creator.id} 
						className="creator-card"
						style={{
							backgroundImage: `url(${creator.image})`
						}}
					>
						<div className="card-actions">
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
									>
										📺
									</a>
								)}
								{creator.twitter && (
									<a
										href={`https://twitter.com/${creator.twitter}`}
										target="_blank"
										rel="noopener noreferrer"
										className="social-icon"
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
										className="social-icon"
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
