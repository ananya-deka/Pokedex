import { useEffect, useState } from "react";

const useFetch = (request, pageNumber) => {
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
			fetch(`${request}&offset=${offset}`)
				.then((res) => res.json())
				.then((data) => {
					const results = data.results;
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
	}, [pageNumber, setAllPokemon, setIsLoading, setHasMore, request]);

	return { allPokemon, isLoading, hasMore };
};

export default useFetch;
