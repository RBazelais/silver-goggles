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
								<svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
									<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
								</svg>
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
								<svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
									<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
								</svg>
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
								<svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"/>
								</svg>
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
