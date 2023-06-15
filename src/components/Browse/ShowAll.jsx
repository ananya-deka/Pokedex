import { useNavigate } from "react-router-dom";
import classes from "./ShowAll.module.css";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import requests from "../../api/requests";

const ShowAll = () => {
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(0);
	const { isLoading, allItems: allPokemon } = useFetch(
		[],
		requests.getAllPokemon,
		currentPage
	);

	useEffect(() => {
		if (allPokemon.length > 0 && !isLoading) {
			navigate("/browse", { state: { pokemon: allPokemon } });
		}
	}, [allPokemon, navigate, isLoading]);

	function handleGetAllPokemon() {
		setCurrentPage(1);
	}

	return (
		<button onClick={handleGetAllPokemon} className={classes.show_all_btn}>
			Go on and catch `em all!
		</button>
	);
};

export default ShowAll;
