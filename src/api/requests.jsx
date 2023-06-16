const endpoint = "https://pokeapi.co/api/v2";
export const imageBaseUrl = "https://img.pokemondb.net/sprites/home/normal/";

const requests = {
	getAllPokemon: `${endpoint}/pokemon?limit=10`,
	getPokemon: (id) => `${endpoint}/pokemon/${id}?limit=10`,
	getColor: (id) => `${endpoint}/pokemon-color/${id}`,
	getAllAbilities: `${endpoint}/ability?limit=10,`,
	getAbilityById: (id) => `${endpoint}/ability/${id}?limit=10,`,
	getAllForms: `${endpoint}/pokemon-form?limit=10,`,
	getFormById: (id) => `${endpoint}/pokemon-form/${id}?limit=10,`,
	getAllSpecies: `${endpoint}/pokemon-species?limit=10,`,
	getSpeciesById: (id) => `${endpoint}/pokemon-species/${id}?limit=10,`,
	getAllTypes: `${endpoint}/type?limit=10,`,
	getTypeById: (id) => `${endpoint}/type/${id}?limit=10,`,
};

export default requests;
