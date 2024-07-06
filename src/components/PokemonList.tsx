"use client";

import axios from "axios";
import { Pokemon } from "@/types/pokemon";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LoadingSpinnerBlack, LoadingSpinnerWhite } from "./LoadingSpinner";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPokemonElementRef = useRef<HTMLDivElement | null>(null);

  const fetchPokemons = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/pokemons?page=${page}`);
      const newPokemons = response.data.data;
      setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
      setHasNextPage(response.data.hasNextPage);
      console.log(response.data);
    } catch (error) {
      setErr("데이터 가져오기에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons(page); // 페이지 변경 시 데이터 가져오기
  }, [page]);

  useEffect(() => {
    if (loading) return; // 로딩 중일 경우 반환
    if (observer.current) observer.current.disconnect(); // 기존 관찰자 연결 해제

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        setPage((prevPage) => prevPage + 1); // 마지막 요소가 보일 경우 페이지 증가
      }
    };

    observer.current = new IntersectionObserver(callback); // 새로운 관찰자 생성
    if (lastPokemonElementRef.current) {
      observer.current.observe(lastPokemonElementRef.current); // 마지막 요소 관찰 시작
    }
  }, [loading, hasNextPage]);

  if (loading && pokemons.length === 0) return <LoadingSpinnerBlack />;
  if (err) return <div>{err}</div>;
  if (pokemons.length === 0) return <div>포켓몬 데이터가 없습니다.</div>;

  return (
    <div className="p-10 bg-gray-800 min-h-screen">
      <p className="font-bold m-4 sm:m-10 text-center text-xl sm:text-2xl text-white">
        포켓몬 도감
      </p>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 text-white">
        {pokemons &&
          Array.isArray(pokemons) &&
          pokemons.map((pokemon, index) => (
            <li
              key={`${pokemon.id}-${index}`}
              className="bg-gray-900 border-solid border-2 rounded-lg border-gray-700 p-4 sm:p-7 flex flex-col items-center"
            >
              <Link href={`/pokemon/${pokemon.id}`}>
                <div
                  className="cursor-pointer max-w-2xl mx-auto transform transition duration-500 hover:scale-105"
                  ref={
                    index === pokemons.length - 1 ? lastPokemonElementRef : null // 마지막 포켓몬 요소 참조 추가
                  }
                >
                  <div className="w-44 h-44 bg-white border-solid border rounded-lg border-black mb-2 animate-glow flex items-center justify-center">
                    <Image
                      className="object-contain w-full h-full"
                      src={
                        pokemon.sprites.other?.dream_world?.front_default ||
                        pokemon.sprites.front_default
                      }
                      alt={pokemon.name}
                      priority
                      width={160}
                      height={160}
                    />
                  </div>
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
      {loading && <LoadingSpinnerWhite />}
      {!hasNextPage && (
        <div className="mt-10 text-center text-white">
          더 이상 불러올 포켓몬이 없습니다.
        </div>
      )}
    </div>
  );
};

export default PokemonList;
