import { useNavigate } from "react-router-dom";
import requests from "../../api/requests";
import classes from "./ShowAll.module.css";

const ShowAll = () => {
	const navigate = useNavigate();
	function getId(url) {
		const id = +url.split("/").slice(-2, -1);
		return id;
	}

	async function getAllPokemon() {
		const response = await fetch(requests.getAllPokemon);
		const data = await response.json();

		const results = data.results;
		const allPokemon = results.map((result) => ({
			...result,
			id: getId(result.url),
		}));

		navigate("/browse", { state: { pokemon: allPokemon } });
	}

	return (
		<button onClick={getAllPokemon} className={classes.show_all_btn}>
			Catch `em all!
		</button>
	);
};

export default ShowAll;
