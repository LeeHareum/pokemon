"use client";

import axios from "axios";
import { Pokemon } from "@/types/pokemon";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get("/api/pokemons");
        setPokemons(response.data);
      } catch (error) {
        setErr("데이터 가져오기에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (err) return <div>{err}</div>;

  return (
    <div className="p-10 bg-gray-800 min-h-screen">
      <p className="font-bold m-4 sm:m-10 text-center text-xl sm:text-2xl text-white">
        포켓몬 도감
      </p>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 text-white">
        {pokemons.map((pokemon) => (
          <li
            className="bg-gray-900 border-solid border-2 rounded-lg border-gray-700 p-4 sm:p-7 flex flex-col items-center"
            key={pokemon.id}
          >
            <Link href={`/pokemon/${pokemon.id}`}>
              <div className="cursor-pointer max-w-2xl mx-auto transform transition duration-500 hover:scale-105">
                <Image
                  className="sm:w-30 sm:h-30 p-3 sm:p-5 bg-white border-solid border rounded-lg border-black mb-2 animate-glow"
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  priority
                  width={180}
                  height={180}
                />
                <p className="text-xs mt-3 mb-1 text-center">
                  No . {pokemon.id}
                </p>
                <p className="text-base sm:text-lg text-center">
                  {pokemon.korean_name}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
