import classes from "./SearchPage.module.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import requests from "../api/requests";
import ShowAll from "../components/Browse/ShowAll";
import FilterOptions from "../components/Filter/FilterOptions";
import SearchBar from "../components/UI/SearchBar";
import pokemonLogo from "../assets/pokemon-logo.png";

const SearchPage = () => {
	const inputRef = useRef();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState();

	async function getPokemon(id) {
		setIsLoading(true);
		const response = await fetch(requests.getPokemon(id));
		const data = await response.json();

		return data;
	}

	async function handleSearch(e) {
		e.preventDefault();

		const pokemonId = inputRef.current.value.toLowerCase();
		const pokemon = await getPokemon(pokemonId);
		setIsLoading(false);

		navigate(`/browse/${pokemonId}`, { state: { pokemon: [pokemon] } });
	}

	return (
		<section className={classes.container}>
			<div className={classes.logo_wrapper}>
				<img src={pokemonLogo} alt="Pokemon" height={200} width={300} />
			</div>
			<SearchBar
				placeholder="Search for your favourite pokemon"
				ref={inputRef}
				search={handleSearch}
			/>
			<div className={classes.text}>
				<p>OR...</p>
			</div>
			<ShowAll />
			{isLoading && <p>Loading...</p>}
			<FilterOptions />
		</section>
	);
};

export default SearchPage;
