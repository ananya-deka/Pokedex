import { useLocation, useParams } from "react-router-dom";
import List from "../components/Browse/List";
import InfiniteList from "../components/Browse/InfiniteList";
import useFetch from "../hooks/useFetch";
import PokemonCard from "../components/Browse/PokemonCard";
import { useState } from "react";
import requests from "../api/requests";

const ListingPage = () => {
	const location = useLocation();
	const [currentPage, setCurrentPage] = useState(1);
	const params = useParams();
	const { pokemon } = location.state || [];

	const {
		allItems: allPokemon,
		isLoading,
		hasMore,
	} = useFetch(pokemon, requests.getAllPokemon, currentPage);

	return params.id || params.filterId ? (
		<List pokemons={pokemon} />
	) : (
		<InfiniteList
			title="Pokemon"
			setCurrentPage={setCurrentPage}
			isLoading={isLoading}
			hasMore={hasMore}
		>
			{allPokemon &&
				allPokemon.map((pokemon) => (
					<div key={pokemon.id}>
						<PokemonCard pokemon={pokemon} />
					</div>
				))}
		</InfiniteList>
	);
};

export default ListingPage;
