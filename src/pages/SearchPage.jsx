import { Input, Container } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import requests from "../api/requests";
import ShowAll from "../components/Browse/ShowAll";
import FilterOptions from "../components/Filter/FilterOptions";

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
		<Container mt={10}>
			<form onSubmit={handleSearch}>
				<Input
					type="search"
					placeholder="Search for your favourite pokemon"
					ref={inputRef}
				/>
			</form>
			<ShowAll />
			{isLoading && <p>Loading...</p>}
			<FilterOptions />
		</Container>
	);
};

export default SearchPage;
