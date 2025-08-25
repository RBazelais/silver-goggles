import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import EditCreator from "./pages/EditCreator";
import AddCreator from "./pages/AddCreator";
import "./App.css";

const Home = () => (
	<div className="bottom-section">
		<p className="no-creators-text">NO CREATORS YET 😊</p>
	</div>
);

const Header = () => {
	return (
		<div className="hero-section">
			<h1 className="main-title">CREATORVERSE</h1>

			<div className="button-container">
				<Link to="/" className="hero-button">
					View All Creators
				</Link>

				<Link to="/add-creator" className="hero-button">
					Add A Creator
				</Link>
			</div>
		</div>
	);
};

// Layout component that wraps all pages
const Layout = ({ children }) => {
	return (
		<>
			<div className="app-container">
				<Header />
				<div className="divider-line"></div>
				{children}
			</div>
		</>
	);
};

const CreatorVerse = () => {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<ShowCreators />} />
					<Route path="/add-creator" element={<AddCreator />} />
					<Route path="/creator/:id" element={<ViewCreator />} />
					<Route path="/creator/:id/edit" element={<EditCreator />} />
					{/* 404 fallback */}
					<Route
						path="*"
						element={
							<div className="page-container">
								<div className="no-creators-text">
									<h2
										style={{
											color: "white",
											marginBottom: "1rem",
										}}
									>
										Page Not Found
									</h2>
									<p>
										The page you're looking for doesn't
										exist.
									</p>
									<Link
										to="/"
										className="nav-button"
										style={{ marginTop: "2rem" }}
									>
										Go Home
									</Link>
								</div>
							</div>
						}
					/>
				</Routes>
			</Layout>
		</Router>
	);
};

export default CreatorVerse;
