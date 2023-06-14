import { useLocation, useParams } from "react-router-dom";
import List from "../components/Browse/List";
import InfiniteList from "../components/Browse/InfiniteList";

const ListingPage = () => {
	const location = useLocation();
	const params = useParams();

	const { pokemon } = location.state || [];

	return params.id ? (
		<List pokemons={pokemon} />
	) : (
		<InfiniteList pokemons={pokemon}></InfiniteList>
	);
};

export default ListingPage;
