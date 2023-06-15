import { useEffect, useState } from "react";

const useFetch = (initial, request, pageNumber) => {
	const [allItems, setAllItems] = useState(initial);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	function getId(url) {
		const id = +url.split("/").slice(-2, -1);
		return id;
	}

	useEffect(() => {
		if (request && (initial.length === 0 || pageNumber > 1)) {
			setIsLoading(true);
			const offset = (pageNumber - 1) * 10;
			fetch(`${request}&offset=${offset}`)
				.then((res) => res.json())
				.then((data) => {
					const results = data.results;
					const current = results.map((result) => ({
						...result,
						id: getId(result.url),
					}));

					setAllItems((prevItems) =>
						pageNumber === 1 ? current : [...prevItems, ...current]
					);

					setIsLoading(false);
					setHasMore(results && results.length > 0);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [initial, pageNumber, setAllItems, setIsLoading, setHasMore, request]);

	return { allItems, isLoading, hasMore };
};

export default useFetch;
