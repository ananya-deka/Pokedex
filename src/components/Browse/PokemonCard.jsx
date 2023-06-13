import classes from "./PokemonCard.module.css";
import Card from "../UI/Card";
import { imageBaseUrl } from "../../api/requests";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ pokemon }) => {
	const navigate = useNavigate();

	function handleNavigation() {
		navigate(`/details/${pokemon.id}`);
	}

	return (
		<Card showDetails={handleNavigation} key={pokemon.id}>
			<header className={classes.header}>
				<h2>{pokemon.name.toUpperCase()}</h2>
			</header>
			<div className={classes.pokemon_img_wrapper}>
				<img
					className={classes.pokemon_img}
					src={`${imageBaseUrl}/${pokemon.id}.svg`}
					width={200}
					height={100}
					alt={pokemon.name}
				/>
			</div>
		</Card>
	);
};

export default PokemonCard;
