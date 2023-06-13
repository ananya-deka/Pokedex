import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import ListingPage from "./pages/ListingPage";
import DetailsPage from "./pages/DetailsPage.jsx";

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
				path: "/details/:id",
				element: <DetailsPage />,
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
