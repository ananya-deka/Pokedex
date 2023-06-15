import classes from "./PokemonCard.module.css";
import Card from "../UI/Card";
import { imageBaseUrl } from "../../api/requests";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PokemonCard = ({ pokemon }) => {
	const navigate = useNavigate();
	const [hovered, setHovered] = useState(false);

	function handleNavigation() {
		navigate(`/details/${pokemon.id}`);
	}

	function handleMouseEnter() {
		setHovered(true);
	}

	function handleMouseLeave() {
		setHovered(false);
	}

	return (
		<div
			className={classes.pokemon_card}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<Card showDetails={handleNavigation} key={pokemon.id}>
				<header className={classes.header}>
					<h2>{pokemon.name && pokemon.name.toUpperCase()}</h2>
				</header>
				<div className={classes.pokemon_img_wrapper}>
					<img
						className={`${classes.pokemon_img} ${
							hovered ? classes.hovered : null
						}`}
						src={`${imageBaseUrl}/${pokemon.id}.svg`}
						width={200}
						height={100}
						alt={pokemon.name}
					/>
				</div>
			</Card>
		</div>
	);
};

export default PokemonCard;
