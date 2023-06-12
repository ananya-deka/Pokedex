import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SearchPage from "./pages/SearchPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <SearchPage />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
