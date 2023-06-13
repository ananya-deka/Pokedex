import { Outlet } from "react-router-dom";
import "./App.css";
import BookmarksProvider from "./contexts/bookmark-context";

function App() {
	return (
		<BookmarksProvider>
			<Outlet />
		</BookmarksProvider>
	);
}

export default App;
