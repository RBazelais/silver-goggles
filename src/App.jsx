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

import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import EditCreator from './pages/EditCreator'
import AddCreator from './pages/AddCreator'

import React, { useState } from 'react';


const CreatorVerse = () => {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'addCreator'

	const handleAddCreatorClick = () => {
		setCurrentPage('addCreator');
	};

	const handleViewAllCreatorsClick = () => {
		setCurrentPage('home');
	};

	const handleNavigateHome = () => {
		setCurrentPage('home');
	};

	const renderContent = () => {
		if (currentPage === 'addCreator') {
		return <AddCreator onNavigateHome={handleNavigateHome} />;
		}

		// Default home content
		return (
		<div className="bottom-section">
			<p className="no-creators-text">NO CREATORS YET 😊</p>
		</div>
		);
	};

	return (
		<>

		<div className="app-container">
			{/* Header Section - Always visible */}
			<header className="hero-section">
				<h1 className="main-title">CREATORVERSE</h1>
				
				<div className="button-container">
					<button 
					className="hero-button"
					onClick={handleViewAllCreatorsClick}
					>
					View All Creators
					</button>
					
					<button 
					className="hero-button"
					onClick={handleAddCreatorClick}
					>
					Add A Creator
					</button>
				</div>
			</header>
			
			<div className="divider-line"></div>
			
			{/* Dynamic Content Area */}
			{renderContent()}
		</div>
		</>
	);
};

export default CreatorVerse;
