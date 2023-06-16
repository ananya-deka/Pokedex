import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/UI/Header";
import requests from "../api/requests";
import List from "../components/Browse/List";

const FilteredDataPage = () => {
	const [pokemon, setPokemon] = useState([]);
	const { filteredData } = useLoaderData();
	const params = useParams();
	const filterType = params.filterType;
	useEffect(() => {
		async function getPokemon(url) {
			const response = await fetch(url);
			const data = await response.json();
			return data;
		}

		async function getPokemonData() {
			const pokemon =
				filterType === "abilities" || filterType === "types"
					? await Promise.all(
							filteredData.pokemon.map(
								async (poke) =>
									await getPokemon(poke.pokemon.url)
							)
					  )
					: filterType === "species"
					? await Promise.all(
							filteredData.varieties.map(
								async (poke) =>
									await getPokemon(poke.pokemon.url)
							)
					  )
					: [await getPokemon(filteredData.pokemon.url)];

			console.log(pokemon);
			setPokemon(pokemon);
		}

		getPokemonData();
	}, [filterType, filteredData.pokemon, filteredData.varieties]);

	return (
		<>
			<Header title={`${filterType} > ${filteredData.name}`} />
			<List pokemons={pokemon} />
		</>
	);
};

export async function loader({ params }) {
	const filterType = params.filterType;
	const id = params.filterId;

	const response = await fetch(
		filterType === "abilities"
			? requests.getAbilityById(id)
			: filterType === "forms"
			? requests.getFormById(id)
			: filterType === "species"
			? requests.getSpeciesById(id)
			: filterType === "types"
			? requests.getTypeById(id)
			: null
	);
	const filteredData = await response.json();

	return { filteredData };
}

export default FilteredDataPage;
