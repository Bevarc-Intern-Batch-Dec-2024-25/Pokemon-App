import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "../index.css";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

  // Function to fetch Pokémon data
  const fetchPokemon = async () => {
    const res = await fetch(API);
    const data = await res.json();

    const detailedPokemonData = data.results.map(async (curPokemon) => {
      const res = await fetch(curPokemon.url);
      const details = await res.json();
      return details;
    });

    return Promise.all(detailedPokemonData);
  };

  // Use React Query with the correct object signature
  const { data: pokemon = [], isLoading, isError, error } = useQuery({
    queryKey: ["pokemon"],
    queryFn: fetchPokemon,
  });

  // Search functionality
  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <section className="container">
        <header>
          <h1>Let's Catch Pokémon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="Search Pokémon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <ul className="cards">
            {searchData.map((curPokemon) => (
              <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
