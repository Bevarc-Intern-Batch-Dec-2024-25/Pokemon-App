import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import PokemonCard from "./PokemonCards";

// Fetch Pokémon Data
const fetchPokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=124");
  const data = await response.json();

  const detailedPokemonData = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return res.json();
    })
  );

  return detailedPokemonData;
};

export const Pokemon = () => {
  const [search, setSearch] = useState("");

  const { data: pokemonList, isLoading, isError, error } = useQuery({
    queryKey: ["pokemon"],
    queryFn: fetchPokemon,
  });

  if (isLoading) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl font-semibold">Loading Pokémon...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl font-semibold text-red-600">Error: {error.message}</h1>
      </div>
    );
  }

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Let's Catch Pokémon</h1>
        <p className="text-gray-600">Search and explore your favorite Pokémon!</p>
      </header>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md mx-auto p-2 border rounded-lg shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};
