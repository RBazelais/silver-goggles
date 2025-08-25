import React from "react";
import { useNavigate } from "react-router-dom";
import './AddCreator.css';

const AddCreator = () => {
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form submitted");

		const formData = new FormData(e.target);
		const creatorData = {
			name: formData.get("name"),
			image: formData.get("image"),
			description: formData.get("description"),
			youtube: formData.get("youtube"),
			twitter: formData.get("twitter"),
			instagram: formData.get("instagram"),
		};

		console.log("Creator data:", creatorData);

		// Save to a database
		// After successful submission, navigate back to home
		navigate("/");
	};

	return (
		<div className="form-container">
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
							<span className="social-icon">📺</span> YouTube
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
							<span className="social-icon">🐦</span> Twitter
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
							<span className="social-icon">📷</span> Instagram
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

				<button type="submit" className="submit-button">
					SUBMIT
				</button>
			</form>
		</div>
	);
};

export default AddCreator;
