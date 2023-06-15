import { Outlet } from "react-router-dom";
import classes from "./App.module.css";
import BookmarksProvider from "./contexts/bookmark-context";
import Navbar from "./components/UI/Navbar";

function App() {
	return (
		<BookmarksProvider>
			<Navbar />
			<section className={classes.container}>
				<Outlet />
			</section>
		</BookmarksProvider>
	);
}

export default App;
