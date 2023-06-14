import Grid from "../Layout/Grid";
import PokemonCard from "./PokemonCard";
import { useState, useRef, useCallback } from "react";
import useFetchAllPokemon from "../../hooks/useFetchAllPokemon";

const List = ({ pokemons }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const { allPokemon, isLoading, hasMore } = useFetchAllPokemon(
		currentPage > 1 ? currentPage : 0
	);

	const observer = useRef();
	const lastPokemonObserver = useCallback(
		(node) => {
			if (isLoading || !hasMore) {
				return;
			}

			if (observer.current) {
				observer.current.disconnect();
			}

			observer.current = new IntersectionObserver((items) => {
				if (items[0].isIntersecting) {
					setCurrentPage((current) => current + 1);
				}
			});

			if (node) {
				observer.current.observe(node);
			}
		},
		[isLoading, hasMore]
	);

	return (
		<Grid>
			{pokemons.map((pokemon, index) =>
				pokemons.length === index + 1 ? (
					<div key={pokemon.id} ref={lastPokemonObserver}>
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
					<div key={pokemon.id} ref={lastPokemonObserver}>
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

export default List;
