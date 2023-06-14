import { useNavigate } from "react-router-dom";
import classes from "./ShowAll.module.css";
import useFetchAllPokemon from "../../hooks/useFetchAllPokemon";
import { useEffect, useState } from "react";

const ShowAll = () => {
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(0);
	const { isLoading, allPokemon } = useFetchAllPokemon(currentPage);

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
			Catch `em all!
		</button>
	);
};

export default ShowAll;
