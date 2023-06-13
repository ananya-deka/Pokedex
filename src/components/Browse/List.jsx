import classes from "./List.module.css";

import Grid from "../Layout/Grid";
import { imageBaseUrl } from "../../api/requests";
import Card from "../UI/Card";

const List = ({ pokemons }) => {
	return (
		<Grid>
			{pokemons.map((pokemon) => (
				<Card key={pokemon.id}>
					<header className={classes.header}>
						<h2>{pokemon.name.toUpperCase()}</h2>
					</header>
					<img
						src={`${imageBaseUrl}/${pokemon.id}.svg`}
						width={300}
						height={100}
						alt={pokemon.name}
					/>
				</Card>
			))}
		</Grid>
	);
};

export default List;
