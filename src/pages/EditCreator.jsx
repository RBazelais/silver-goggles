import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCreator, updateCreator } from "../supabaseClient";

const EditCreator = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [creator, setCreator] = useState(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);
		setError("");
		setSuccess("");

		try {
			// Get form data
			const formData = new FormData(e.target);

			// Validate that at least one social media link is provided
			const youtube = formData.get("youtube");
			const twitter = formData.get("twitter");
			const instagram = formData.get("instagram");

			if (!youtube && !twitter && !instagram) {
				setError("Please provide at least one social media link.");
				setSaving(false);
				return;
			}

			const updatedData = {
				name: formData.get("name").trim(),
				image: formData.get("image").trim(),
				description: formData.get("description").trim(),
				youtube: youtube ? youtube.trim() : null,
				twitter: twitter ? twitter.trim() : null,
				instagram: instagram ? instagram.trim() : null,
				updated_at: new Date().toISOString(),
			};

			// Validate required fields
			if (
				!updatedData.name ||
				!updatedData.image ||
				!updatedData.description
			) {
				setError("Please fill in all required fields.");
				setSaving(false);
				return;
			}

			console.log("Updating creator data:", updatedData);

			// Update in Supabase
			const { data, error } = await updateCreator(id, updatedData);

			if (error) {
				setError(`Failed to update creator: ${error}`);
				setSaving(false);
				return;
			}

			console.log("Creator updated successfully:", data);
			setSuccess("Creator updated successfully!");

			// Navigate back to creator page after a short delay
			setTimeout(() => {
				navigate(`/creator/${id}`);
			}, 1500);
		} catch (err) {
			console.error("Unexpected error:", err);
			setError("An unexpected error occurred. Please try again.");
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<div className="page-container">
				<div className="loading-container">
					<div className="loading-spinner"></div>
					<p>Loading creator...</p>
				</div>
			</div>
		);
	}

	if (error && !creator) {
		return (
			<div className="page-container">
				<div className="error-container">
					<h2>Creator Not Found</h2>
					<p>{error}</p>
					<Link to="/" className="nav-button">
						Back to All Creators
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="page-container">
			<div className="form-container">
				<div className="form-header">
					<h1 className="form-title">Edit Creator</h1>
					<p className="form-subtitle">
						Update {creator?.name}'s information
					</p>
				</div>

				{error && <div className="message error-message">{error}</div>}

				{success && (
					<div className="message success-message">{success}</div>
				)}

				<form onSubmit={handleSubmit} className="creator-form">
					<div className="form-group">
						<label htmlFor="name" className="form-label">
							Name *
						</label>
						<input
							type="text"
							id="name"
							name="name"
							className="form-input"
							defaultValue={creator?.name || ""}
							required
							disabled={saving}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="image" className="form-label">
							Image *
						</label>
						<p className="form-description">
							Provide a link to an image of your creator. Be sure
							to include the http://
						</p>
						<input
							type="url"
							id="image"
							name="image"
							className="form-input"
							placeholder="https://example.com/image.jpg"
							defaultValue={creator?.image || ""}
							required
							disabled={saving}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="description" className="form-label">
							Description *
						</label>
						<p className="form-description">
							Provide a description of the creator. Who are they?
							What makes them interesting?
						</p>
						<textarea
							id="description"
							name="description"
							className="form-textarea"
							rows="4"
							defaultValue={creator?.description || ""}
							required
							disabled={saving}
						/>
					</div>

					<div className="social-links-section">
						<h3 className="social-title">SOCIAL MEDIA LINKS</h3>
						<p className="social-description">
							Provide at least one of the creator's social media
							links.
						</p>

						<div className="form-group">
							<label
								htmlFor="youtube"
								className="form-label social-label"
							>
								<svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
									<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
								</svg> YouTube
							</label>
							<p className="form-description">
								The creator's YouTube handle (without the @)
							</p>
							<input
								type="text"
								id="youtube"
								name="youtube"
								className="form-input"
								placeholder="channelname"
								defaultValue={creator?.youtube || ""}
								disabled={saving}
							/>
						</div>

						<div className="form-group">
							<label
								htmlFor="twitter"
								className="form-label social-label"
							>
								<svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
									<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
								</svg> Twitter
							</label>
							<p className="form-description">
								The creator's Twitter handle (without the @)
							</p>
							<input
								type="text"
								id="twitter"
								name="twitter"
								className="form-input"
								placeholder="username"
								defaultValue={creator?.twitter || ""}
								disabled={saving}
							/>
						</div>

						<div className="form-group">
							<label
								htmlFor="instagram"
								className="form-label social-label"
							>
								<svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
								</svg> Instagram
							</label>
							<p className="form-description">
								The creator's Instagram handle (without the @)
							</p>
							<input
								type="text"
								id="instagram"
								name="instagram"
								className="form-input"
								placeholder="username"
								defaultValue={creator?.instagram || ""}
								disabled={saving}
							/>
						</div>
					</div>

					<div className="form-actions">
						<Link to={`/creator/${id}`} className="cancel-button">
							Cancel
						</Link>
						<button
							type="submit"
							className="submit-button"
							disabled={saving}
						>
							{saving ? "UPDATING..." : "UPDATE CREATOR"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditCreator;
