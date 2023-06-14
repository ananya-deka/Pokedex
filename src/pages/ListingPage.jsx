import { useLocation } from "react-router-dom";
import List from "../components/Browse/List";

const ListingPage = () => {
	const location = useLocation();
	const { pokemon } = location.state || [];

	return <List pokemons={pokemon} />;
};

export default ListingPage;
