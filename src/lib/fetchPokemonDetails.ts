export const fetchPokemonDetails = async (id: string) => {
  try {
    const response = await fetch(
      `https://pokemon-five-gray.vercel.app/api/pokemons/${id}`
    );
    const pokemon = await response.json();
    console.log(response);
    return pokemon;
  } catch (error) {
    console.error(error);
    return null;
  }
};
