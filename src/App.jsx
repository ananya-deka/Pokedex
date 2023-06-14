import { Outlet } from "react-router-dom";
import "./App.css";
import BookmarksProvider from "./contexts/bookmark-context";
import Navbar from "./components/UI/Navbar";

function App() {
	return (
		<BookmarksProvider>
			<Navbar />
			<Outlet />
		</BookmarksProvider>
	);
}

export default App;
