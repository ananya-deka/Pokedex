import { Outlet } from "react-router-dom";
import "./App.css";
import BookmarksProvider from "./contexts/bookmark-context";
import Navbar from "./components/UI/Navbar";
import { useEffect } from "react";
import requests from "./api/requests";

function App() {
	useEffect(() => {
		async function getAbilities() {
			const response = await fetch(requests.getAllAbilities);
			const data = await response.json();

			console.log(data);
		}

		getAbilities();
	}, []);

	return (
		<BookmarksProvider>
			<Navbar />
			<Outlet />
		</BookmarksProvider>
	);
}

export default App;
