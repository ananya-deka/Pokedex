import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import ListingPage from "./pages/ListingPage";
import DetailsPage from "./pages/DetailsPage.jsx";
import BookmarksPage from "./pages/BookmarksPage.jsx";
import FilterPage from "./pages/FilterPage.jsx";

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
			},
			{
				path: "/filter/:filterType/:filterId?",
				element: <ListingPage />,
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
		<ChakraProvider>
			<RouterProvider router={router} />
		</ChakraProvider>
	</React.StrictMode>
);
