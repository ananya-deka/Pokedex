import Grid from "../Layout/Grid";
import PokemonCard from "./PokemonCard";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import requests from "../../api/requests";
import { useDetectLastNode } from "../../hooks/useDetectLastNode";

const InfiniteListFilter = ({ pokemons }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const { allPokemon, isLoading, hasMore } = useFetch(
		pokemons,
		requests.getAllPokemon,
		currentPage
	);

	const { lastNodeObserver } = useDetectLastNode(
		isLoading,
		hasMore,
		setCurrentPage
	);

	return (
		<Grid>
			{allPokemon.map((pokemon, index) =>
				allPokemon.length === index + 1 ? (
					<div key={pokemon.id} ref={lastNodeObserver}>
						<PokemonCard pokemon={pokemon} />
					</div>
				) : (
					<div key={pokemon.id}>
						<PokemonCard pokemon={pokemon} />
					</div>
				)
			)}
		</Grid>
	);
};

export default InfiniteListFilter;
