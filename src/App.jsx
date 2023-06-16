import { Outlet } from "react-router-dom";
import classes from "./App.module.css";
import BookmarksProvider from "./contexts/bookmark-context";
import Navbar from "./components/UI/Navbar";

function App() {
	return (
		<BookmarksProvider>
			<section className={classes.page}>
				<Navbar />
				<main className={classes.container}>
					<Outlet />
				</main>
			</section>
		</BookmarksProvider>
	);
}

export default App;
