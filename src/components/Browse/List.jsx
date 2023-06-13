import Grid from "../Layout/Grid";
import PokemonCard from "./PokemonCard";

const List = ({ pokemons }) => {
	return (
		<Grid>
			{pokemons.map((pokemon) => (
				<PokemonCard key={pokemon.id} pokemon={pokemon} />
			))}
		</Grid>
	);
};

export default List;
