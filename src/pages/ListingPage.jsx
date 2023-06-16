import { useLocation, useParams } from "react-router-dom";
import List from "../components/Browse/List";
import InfiniteList from "../components/Browse/InfiniteList";
import useFetch from "../hooks/useFetch";
import PokemonCard from "../components/Browse/PokemonCard";
import { useEffect, useState } from "react";
import requests from "../api/requests";

const ListingPage = () => {
	const [pokemon, setPokemon] = useState();
	const location = useLocation();
	const [currentPage, setCurrentPage] = useState(1);
	const params = useParams();

	const {
		allItems: allPokemon,
		isLoading,
		hasMore,
	} = useFetch(pokemon, requests.getAllPokemon, currentPage);

	useEffect(() => {
		async function getPokemon(id) {
			const response = await fetch(requests.getPokemon(id));
			const data = await response.json();
			setPokemon([data]);
		}

		if (params.id) {
			if (location.state?.pokemon) {
				setPokemon(location.state.pokemon);
			} else {
				getPokemon(params.id);
			}
		}
	}, [params.id, location.state, setPokemon]);

	return params.id ? (
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
