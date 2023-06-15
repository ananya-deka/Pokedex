import classes from "./SearchPage.module.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import requests from "../api/requests";
import ShowAll from "../components/Browse/ShowAll";
import FilterOptions from "../components/Filter/FilterOptions";
import SearchBar from "../components/UI/SearchBar";
import pokemonLogo from "../assets/pokemon-logo.png";
import { Spinner } from "@chakra-ui/react";

const SearchPage = () => {
	const inputRef = useRef();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	async function getPokemon(id) {
		setIsLoading(true);
		setError(false);
		const response = await fetch(requests.getPokemon(id));
		if (!response.ok) {
			const error = await response.text();
			setError(error);
		} else {
			const data = await response.json();
			return data;
		}
	}

	async function handleSearch(e) {
		e.preventDefault();

		const pokemonId = inputRef.current.value.toLowerCase();
		const pokemon = await getPokemon(pokemonId);
		setIsLoading(false);

		if (pokemon) {
			navigate(`/browse/${pokemonId}`, { state: { pokemon: [pokemon] } });
		}
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
				disabled={isLoading}
			/>
			<div className={classes.status}>
				{isLoading && (
					<>
						Loading...
						<Spinner />
					</>
				)}
				{error && <p className={classes.error}>Error: {error}</p>}
			</div>
			<div className={classes.text}>
				<p>OR...</p>
			</div>
			<ShowAll />

			<FilterOptions />
		</section>
	);
};

export default SearchPage;
