import { createContext, useContext, useEffect, useState } from "react";

const filterContext = createContext();
export const useFilters = () => useContext(filterContext);

const FiltersProvider = (props) => {
	const [abilities, setAbilities] = useState([]);
	const [forms, setForms] = useState([]);
	const [species, setSpecies] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const bookmarks = localStorage.getItem("bookmarks");
		if (bookmarks) {
			setBookmarks(JSON.parse(bookmarks));
			setIsLoaded(true);
		}
	}, []);

	useEffect(() => {
		if (isLoaded) {
			localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
		}
	}, [bookmarks, isLoaded]);

	function deleteFromBookmarks(bookmarks, id) {
		const toDelete = { ...bookmarks };
		delete toDelete[id];
		return toDelete;
	}

	function addToBookmark(bookmarks, pokemon) {
		return { ...bookmarks, [pokemon.id]: pokemon };
	}

	function toggleBookmark(pokemon) {
		setBookmarks((bookmarks) =>
			bookmarks[pokemon.id]
				? deleteFromBookmarks(bookmarks, pokemon.id)
				: addToBookmark(bookmarks, pokemon)
		);
	}

	const value = {
		bookmarks,
		toggleBookmark,
	};

	return (
		<filterContext.Provider value={value}>
			{props.children}
		</filterContext.Provider>
	);
};

export default FiltersProvider;
