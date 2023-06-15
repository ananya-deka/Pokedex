import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import requests from "../api/requests";
import Card from "../components/UI/Card";
import ImageCard from "../components/Details/ImageCard";
import DetailsCard from "../components/Details/DetailsCard";
import classes from "./DetailsPage.module.css";
import { useBookmarks } from "../contexts/bookmark-context";

const DetailPage = () => {
	const [pokemonDetails, setPokemonDetails] = useState({});
	const [pokemonSpecies, setPokemonSpecies] = useState({});
	const params = useParams();
	const { toggleBookmark } = useBookmarks();

	const id = params.id;
	useEffect(() => {
		async function getPokemonDetails(id) {
			const response = await fetch(requests.getPokemon(id));
			const pokemonDetails = await response.json();

			setPokemonDetails(pokemonDetails);
		}

		getPokemonDetails(id);
	}, [id]);

	useEffect(() => {
		async function getSpecies() {
			const response = await fetch(pokemonDetails.species.url);
			const data = await response.json();
			setPokemonSpecies(data);
		}

		if (pokemonDetails.species) getSpecies();
	}, [pokemonDetails]);

	function handleAddToBookmark() {
		toggleBookmark(pokemonDetails);
	}

	return (
		<section className={classes.container}>
			<Card>
				<div
					className={classes.card_content}
					style={
						pokemonSpecies.color
							? {
									backgroundImage: `radial-gradient(transparent, ${pokemonSpecies.color.name})`,
							  }
							: {}
					}
				>
					<ImageCard
						id={pokemonDetails.id}
						name={pokemonDetails.name}
						types={pokemonDetails.types}
						addToBookmark={handleAddToBookmark}
						color={pokemonSpecies.color}
					/>
					<DetailsCard
						name={pokemonDetails.name}
						abilities={pokemonDetails.abilities}
						weight={pokemonDetails.weight}
						height={pokemonDetails.height}
						exp={pokemonDetails.base_experience}
						stats={pokemonDetails.stats}
						species={pokemonSpecies}
						moves={pokemonDetails.moves}
					/>
				</div>
			</Card>
		</section>
	);
};

export default DetailPage;
