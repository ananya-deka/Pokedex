import Grid from "../Layout/Grid";
import PokemonCard from "./PokemonCard";

const List = ({ pokemons }) => {
	return (
		<Grid display={pokemons.length > 3 ? "grid" : "flex"}>
			{pokemons.map((pokemon) => (
				<div key={pokemon.id}>
					<PokemonCard pokemon={pokemon} />
				</div>
			))}
		</Grid>
	);
};

export default List;
