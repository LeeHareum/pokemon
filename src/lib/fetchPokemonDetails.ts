import axios from "axios";
import { Pokemon } from "@/types/pokemon";

// export const fetchPokemonDetails = async (
//   id: string
// ): Promise<Pokemon | null> => {
//   try {
//     const response = await axios.get(
//       `https://pokemon-five-gray.vercel.app/pokemon/${id}` // 배포링크
//     );
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching pokemon details:", error);
//     return null;
//   }
// };

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
