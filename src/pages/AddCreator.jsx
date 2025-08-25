import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCreator } from "../supabaseClient";
import './AddCreator.css';

const AddCreator = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const formData = new FormData(e.target);
			const creatorData = {
				name: formData.get("name"),
				image: formData.get("image"),
				description: formData.get("description"),
				youtube: formData.get("youtube"),
				twitter: formData.get("twitter"),
				instagram: formData.get("instagram"),
			};

			console.log("Submitting creator data:", creatorData);

			const { data, error: createError } = await createCreator(creatorData);

			if (createError) {
				throw new Error(createError);
			}

			console.log("Creator created successfully:", data);
			// After successful submission, navigate back to home
			navigate("/");
		} catch (err) {
			console.error("Error creating creator:", err);
			setError(err.message || "Failed to create creator");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="form-container">
			{error && (
				<div className="error-message" style={{ 
					background: 'rgba(239, 68, 68, 0.1)', 
					border: '1px solid rgba(239, 68, 68, 0.3)', 
					color: '#fca5a5', 
					padding: '1rem', 
					borderRadius: '8px', 
					marginBottom: '1.5rem', 
					textAlign: 'center' 
				}}>
					{error}
				</div>
			)}
			<form onSubmit={handleSubmit} className="creator-form">
				<div className="form-group">
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						className="form-input"
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="image" className="form-label">
						Image
					</label>
					<p className="form-description">
						Provide a link to an image of your creator. Be sure to
						include the http://
					</p>
					<input
						type="url"
						id="image"
						name="image"
						className="form-input"
						placeholder="https://example.com/image.jpg"
						required
					/>
				</div>

				<div className="form-group">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<p className="form-description">
						Provide a description of the creator. Who are they? What
						makes them interesting?
					</p>
					<textarea
						id="description"
						name="description"
						className="form-textarea"
						rows="4"
						required
					></textarea>
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
							placeholder="channel name"
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
						/>
					</div>
				</div>

				<button 
					type="submit" 
					className={`submit-button ${loading ? 'loading' : ''}`}
					disabled={loading}
				>
					{loading ? 'SUBMITTING...' : 'SUBMIT'}
				</button>
			</form>
		</div>
	);
};

export default AddCreator;
