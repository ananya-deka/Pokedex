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

	if (
		filterType !== "abilities" &&
		filterType !== "forms" &&
		filterType !== "species" &&
		filterType !== "types"
	) {
		throw new Error("Invalid path");
	}

	const response = await fetch(
		filterType === "abilities"
			? requests.getAbilityById(id)
			: filterType === "forms"
			? requests.getFormById(id)
			: filterType === "species"
			? requests.getSpeciesById(id)
			: requests.getTypeById(id)
	);

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error);
	}

	const filteredData = await response.json();

	return { filteredData };
}

export default FilteredDataPage;
