import classes from "./PokemonCard.module.css";
import Card from "../UI/Card";
import { imageBaseUrl } from "../../api/requests";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import fallbackImg from "../../assets/pokeball-png-45337.png";

const PokemonCard = ({ pokemon }) => {
	const navigate = useNavigate();
	const [hovered, setHovered] = useState(false);
	const [color, setColor] = useState("gray");

	function handleNavigation() {
		navigate(`/details/${pokemon.id}`);
	}

	function handleMouseEnter() {
		setHovered(true);
	}

	function handleMouseLeave() {
		setHovered(false);
	}

	function handleFallback(e) {
		e.target.src = fallbackImg;
	}

	useEffect(() => {
		async function getPokemon() {
			const response = await fetch(pokemon.url);
			const data = response.json();
			return data;
		}

		async function getSpecies(url) {
			const response = await fetch(url);
			const data = response.json();
			return data;
		}

		if (pokemon.url) {
			getPokemon().then((pokemon) =>
				getSpecies(pokemon.species.url).then((species) =>
					setColor(species.color.name)
				)
			);
		} else if (pokemon.species) {
			getSpecies(pokemon.species.url).then((species) =>
				setColor(species.color.name)
			);
		}
	}, [pokemon]);

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
				<div
					className={classes.pokemon_img_wrapper}
					style={{
						backgroundImage: `radial-gradient(transparent, transparent, ${color})`,
					}}
				>
					<img
						className={`${classes.pokemon_img} ${
							hovered ? classes.hovered : null
						}`}
						src={`${imageBaseUrl}/${pokemon.name}.png`}
						width={200}
						height={100}
						onError={handleFallback}
						alt={pokemon.name}
					/>
				</div>
			</Card>
		</div>
	);
};

export default PokemonCard;
