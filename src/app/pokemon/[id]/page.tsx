import { notFound } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { Pokemon, PokemonDetailProps } from "@/types/pokemon";

const fetchPokemonDetails = async (id: string): Promise<Pokemon | null> => {
  try {
    const response = await axios.get(
      `http://https://pokemon-zeta-beige.vercel.app/api/pokemons/${id}` // 배포링크
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pokemon details:", error);
    return null;
  }
};

const PokemonDetailPage = async ({ params }: PokemonDetailProps) => {
  const pokemonDetails = await fetchPokemonDetails(params.id);

  if (!pokemonDetails) {
    notFound();
  }

  return (
    <div className="p-5 bg-gray-600 min-h-screen flex items-center justify-center">
      <div
        className="max-w-2xl mx-auto bg-white rounded-xl overflow-hidden 
                  shadow-[0_10px_20px_rgba(0,0,0,0.3)] 
                  border border-gray-200
                  transform transition duration-500 hover:scale-105"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="md:flex-shrink-0 flex items-center justify-center">
            <Image
              className="m-8 object-cover"
              src={pokemonDetails.sprites.front_default}
              alt={pokemonDetails.name}
              priority
              width={270}
              height={270}
            />
          </div>
          <div className="pb-2">
            <div className="uppercase tracking-wide text-m text-blue-900 font-semibold">
              No. {pokemonDetails.id}
            </div>
            <h1 className="block mt-3 mb-3 text-xl leading-tight font-medium text-black">
              {pokemonDetails.korean_name} ({pokemonDetails.name})
            </h1>
            <p className="mt-1 text-gray-500">
              타입:{" "}
              {pokemonDetails.types.map((t) => t.type.korean_name).join(", ")}
            </p>
            <p className="mt-1 text-gray-500">
              키: {pokemonDetails.height / 10}m
            </p>
            <p className="mt-1 text-gray-500">
              몸무게: {pokemonDetails.weight / 10}kg
            </p>
          </div>
        </div>
        <div className="mb-7 mx-7">
          <Link
            href="/"
            className="bg-gray-700 mt-5 flex items-center justify-center text-white py-3 px-4 rounded-md hover:bg-navy-600"
          >
            리스트로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
