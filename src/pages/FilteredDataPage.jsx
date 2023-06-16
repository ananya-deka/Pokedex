import classes from "./FilteredData.module.css";
import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/UI/Header";
import requests from "../api/requests";
import InfiniteList from "../components/Browse/InfiniteList";
import PokemonCard from "../components/Browse/PokemonCard";
import FilterSelect from "../components/Filter/FilterSelect";

const FilteredDataPage = () => {
	const [pokemon, setPokemon] = useState([]);
	const [pokemonUrls, setPokemonUrls] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(false);
	const { filteredData } = useLoaderData();
	const params = useParams();
	const filterType = params.filterType;
	const filterId = params.filterId;

	useEffect(() => {
		setCurrentPage(1);
		setHasMore(false);
		setIsLoading(false);
		setPokemon([]);
	}, [filterId]);

	useEffect(() => {
		async function getPokemonUrls() {
			const pokemonUrls =
				filterType === "abilities" || filterType === "types"
					? filteredData.pokemon.map((poke) => poke.pokemon.url)
					: filterType === "species"
					? filteredData.varieties.map((poke) => poke.pokemon.url)
					: [filteredData.pokemon.url];
			setPokemonUrls(pokemonUrls);
		}

		getPokemonUrls();
	}, [filterType, filteredData.pokemon, filteredData.varieties]);

	useEffect(() => {
		async function getPokemon(url) {
			const response = await fetch(url);
			const data = await response.json();
			return data;
		}
		setIsLoading(true);
		const start = (currentPage - 1) * 10;
		Promise.all(
			pokemonUrls
				?.slice(start, start + 10)
				.map(async (url) => await getPokemon(url))
		).then((pokemonSlice) => {
			setPokemon((prevPokemon) =>
				currentPage === 1
					? pokemonSlice
					: [...prevPokemon, ...pokemonSlice]
			);
			setIsLoading(false);
			setHasMore(start + 10 <= pokemonUrls.length);
		});
	}, [pokemonUrls, currentPage]);

	return (
		<>
			<div className={classes.header}>
				<Header title={`${filterType} > ${filteredData.name}`} />
				{filterType === "types" && <FilterSelect />}
			</div>

			<InfiniteList
				isLoading={isLoading}
				hasMore={hasMore}
				setCurrentPage={setCurrentPage}
				display={pokemon?.length > 3 ? "grid" : "flex"}
			>
				{pokemon?.map((poke) => (
					<div key={poke.id}>
						<PokemonCard pokemon={poke} />
					</div>
				))}
			</InfiniteList>
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
