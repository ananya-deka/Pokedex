import { useEffect, useState } from "react";
import requests from "../api/requests";

const useFetchAllPokemon = (pageNumber) => {
	const [allPokemon, setAllPokemon] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	function getId(url) {
		const id = +url.split("/").slice(-2, -1);
		return id;
	}

	useEffect(() => {
		if (pageNumber >= 1) {
			setIsLoading(true);
			const offset = (pageNumber - 1) * 10;
			fetch(`${requests.getAllPokemon}&offset=${offset}`)
				.then((res) => res.json())
				.then((data) => {
					const results = data.results;
					console.log(data);
					const currentPokemon = results.map((result) => ({
						...result,
						id: getId(result.url),
					}));

					setAllPokemon((pokemon) => [...pokemon, ...currentPokemon]);

					setIsLoading(false);
					setHasMore(results && results.length > 0);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [pageNumber, setAllPokemon, setIsLoading, setHasMore]);

	return { allPokemon, isLoading, hasMore };
};

export default useFetchAllPokemon;
