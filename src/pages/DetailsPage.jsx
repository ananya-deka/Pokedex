import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import requests from "../api/requests";
import Card from "../components/UI/Card";
import ImageCard from "../components/Details/ImageCard";
import DetailsCard from "../components/Details/DetailsCard";
import classes from "./DetailsPage.module.css";

const DetailPage = () => {
	const [pokemonDetails, setPokemonDetails] = useState({});

	const params = useParams();
	const id = params.id;

	useEffect(() => {
		async function getPokemonDetails(id) {
			const response = await fetch(requests.getPokemon(id));
			const pokemonDetails = await response.json();

			setPokemonDetails(pokemonDetails);
		}

		getPokemonDetails(id);
	}, [id]);

	return (
		<section className={classes.container}>
			<Card>
				<div className={classes.card_content}>
					<ImageCard
						id={pokemonDetails.id}
						name={pokemonDetails.name}
						types={pokemonDetails.types}
					/>
					<DetailsCard
						name={pokemonDetails.name}
						abilities={pokemonDetails.abilities}
						weight={pokemonDetails.weight}
						height={pokemonDetails.height}
						exp={pokemonDetails.base_experience}
						stats={pokemonDetails.stats}
					/>
				</div>
			</Card>
		</section>
	);
};

export default DetailPage;
