import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import ListingPage from "./pages/ListingPage";
import DetailsPage from "./pages/DetailsPage.jsx";
import BookmarksPage from "./pages/BookmarksPage.jsx";
import FilterPage, { loader as filterLoader } from "./pages/FilterPage.jsx";
import FilteredDataPage, {
	loader as filteredDataLoader,
} from "./pages/FilteredDataPage.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				index: true,
				element: <SearchPage />,
			},
			{
				path: "/browse/:id?",
				element: <ListingPage />,
			},
			{
				path: "/filter/:filterType/",
				element: <FilterPage />,
				loader: filterLoader,
			},
			{
				path: "/filter/:filterType/:filterId?",
				element: <FilteredDataPage />,
				loader: filteredDataLoader,
			},
			{
				path: "/details/:id",
				element: <DetailsPage />,
			},
			{
				path: "/bookmarks",
				element: <BookmarksPage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
