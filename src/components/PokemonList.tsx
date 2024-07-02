"use client";

import axios from "axios";
import { useEffect, useState } from "react";

type Pokemon = {
  id: number;
  name: string;
  korean_name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: { type: { name: string; korean_name: string } }[];
  abilities: { ability: { name: string; korean_name: string } }[];
  moves: { move: { name: string; korean_name: string } }[];
};

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
    <div className="p-7 bg-gray-800 min-h-screen">
      <p className="font-bold m-10 text-center text-xl text-white">
        포켓몬 도감
      </p>
      <ul className="grid grid-cols-5 gap-5 text-white">
        {pokemons.map((pokemon) => (
          <li
            className="border-solid border rounded border-grey p-4 flex flex-col items-center"
            key={pokemon.id}
          >
            <img
              className="p-5 bg-white border-solid border rounded-lg border-grey mb-2 animate-glow"
              src={pokemon.sprites.front_default}
            />
            <p className="text-sm">No : {pokemon.id}</p>
            <p>{pokemon.korean_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
