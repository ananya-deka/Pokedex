const endpoint = "https://pokeapi.co/api/v2";
export const imageBaseUrl =
	"https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world";

const requests = {
	getAllPokemon: `${endpoint}/pokemon?limit=10`,
	getPokemon: (id) => `${endpoint}/pokemon/${id}?limit=10`,
	getColor: (id) => `${endpoint}/pokemon-color/${id}`,
	getAllAbilities: `${endpoint}/ability?limit=10,`,
	getAllForms: `${endpoint}/pokemon-form?limit=10,`,
	getAllSpecies: `${endpoint}/pokemon-species?limit=10,`,
};

export default requests;
