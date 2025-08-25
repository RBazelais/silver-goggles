import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCreator, deleteCreator } from "../supabaseClient";
import "./ViewCreator.css";

const ViewCreator = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [creator, setCreator] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		fetchCreator();
	}, [id]);

	const fetchCreator = async () => {
		try {
			setLoading(true);
			const { data, error } = await getCreator(id);

			if (error) {
				setError(error);
			} else if (data) {
				setCreator(data);
			} else {
				setError("Creator not found");
			}
		} catch (err) {
			setError("Failed to load creator");
			console.error("Error fetching creator:", err);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async () => {
		if (
			!window.confirm(
				`Are you sure you want to delete ${creator.name}? This action cannot be undone.`,
			)
		) {
			return;
		}

		try {
			setDeleting(true);
			const { error } = await deleteCreator(id);

			if (error) {
				alert(`Failed to delete creator: ${error}`);
			} else {
				navigate("/", { replace: true });
			}
		} catch (err) {
			console.error("Error deleting creator:", err);
			alert("An unexpected error occurred while deleting the creator.");
		} finally {
			setDeleting(false);
		}
	};

	if (loading) {
		return (
			<div className="modal-overlay">
				<div className="creator-detail">
					<div className="loading-container">
						<div className="loading-spinner"></div>
						<p>Loading creator...</p>
					</div>
				</div>
			</div>
		);
	}

	if (error || !creator) {
		return (
			<div className="modal-overlay">
				<div className="creator-detail">
					<div className="error-container">
						<h2>Creator Not Found</h2>
						<p>
							{error ||
								"The creator you're looking for doesn't exist."}
						</p>
						<Link to="/" className="nav-button">
							Back to All Creators
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="modal-overlay" onClick={(e) => {
			if (e.target === e.currentTarget) {
				navigate("/");
			}
		}}>
			<div className="creator-detail">
				<div className="creator-header">
					<img
						src={creator.image}
						alt={creator.name}
						className="creator-image"
						onError={(e) => {
							e.target.src =
								"https://via.placeholder.com/250x250?text=Image+Not+Found";
						}}
					/>
					<div className="creator-info">
						<h1 className="creator-name">{creator.name}</h1>
						<div className="creator-description">
							<p>{creator.description}</p>
						</div>
					</div>
				</div>

				<div className="social-links">
					<h3>Social Media Links</h3>
					<div className="social-list">
						{creator.youtube && (
							<div className="social-item">
								<span className="social-icon">📺</span>
								<div className="social-info">
									<div className="social-platform">
										YouTube
									</div>
									<div className="social-handle">
										@{creator.youtube}
									</div>
								</div>
								<a
									href={`https://youtube.com/@${creator.youtube}`}
									target="_blank"
									rel="noopener noreferrer"
									className="social-link"
								>
									Visit
								</a>
							</div>
						)}

						{creator.twitter && (
							<div className="social-item">
								<span className="social-icon">🐦</span>
								<div className="social-info">
									<div className="social-platform">
										Twitter
									</div>
									<div className="social-handle">
										@{creator.twitter}
									</div>
								</div>
								<a
									href={`https://twitter.com/${creator.twitter}`}
									target="_blank"
									rel="noopener noreferrer"
									className="social-link"
								>
									Visit
								</a>
							</div>
						)}

						{creator.instagram && (
							<div className="social-item">
								<span className="social-icon">📷</span>
								<div className="social-info">
									<div className="social-platform">
										Instagram
									</div>
									<div className="social-handle">
										@{creator.instagram}
									</div>
								</div>
								<a
									href={`https://instagram.com/${creator.instagram}`}
									target="_blank"
									rel="noopener noreferrer"
									className="social-link"
								>
									Visit
								</a>
							</div>
						)}
					</div>
				</div>

				<div className="action-buttons">
					<Link to="/" className="nav-button secondary">
						← Back to All
					</Link>
					<Link
						to={`/creator/${creator.id}/edit`}
						className="nav-button"
					>
						Edit Creator
					</Link>
					<button
						onClick={handleDelete}
						disabled={deleting}
						className="nav-button danger"
					>
						{deleting ? "Deleting..." : "Delete Creator"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ViewCreator;
