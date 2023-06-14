import Grid from "../Layout/Grid";
import PokemonCard from "./PokemonCard";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import requests from "../../api/requests";
import { useDetectLastNode } from "../../hooks/useDetectLastNode";

const InfiniteList = ({ pokemons }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const { allPokemon, isLoading, hasMore } = useFetch(
		requests.getAllPokemon,
		currentPage > 1 ? currentPage : 0
	);

	const { lastNodeObserver } = useDetectLastNode(
		isLoading,
		hasMore,
		setCurrentPage
	);

	return (
		<Grid>
			{pokemons.map((pokemon, index) =>
				pokemons.length === index + 1 ? (
					<div key={pokemon.id} ref={lastNodeObserver}>
						<PokemonCard pokemon={pokemon} />
					</div>
				) : (
					<div key={pokemon.id}>
						<PokemonCard pokemon={pokemon} />
					</div>
				)
			)}
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

export default InfiniteList;
