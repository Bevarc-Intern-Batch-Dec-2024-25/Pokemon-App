import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PokemanDetails = () => {
  const location = useLocation();
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);
  const [loading,setLoading] = useState<boolean>(false);  
  const pokemonUrl = location.state?.pokemonUrl;

  useEffect(() => {
    if (pokemonUrl) {
      const fetchPokemonDetails = async () => {
        try {
          const response = await axios.get(pokemonUrl);
          setPokemonDetails(response.data);
        } catch (err) {
          console.error("Error fetching Pokémon details:", err);
        }
      };
      fetchPokemonDetails();
    }
  }, [pokemonUrl]);

  if (!pokemonDetails) {
    return <p>Loading Pokémon details...</p>;
  }  
   
  return (
      
    <div className=" bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">{pokemonDetails.name}</h1>
      <img
        src={pokemonDetails.sprites?.front_default}
        alt={pokemonDetails.name}
        className="w-32 h-32"
      />
      <p>Height: {pokemonDetails.height}</p>
      <p>Weight: {pokemonDetails.weight}</p>
      <p>Base Experience: {pokemonDetails.base_experience}</p>
    </div>
     
  );
};

export default PokemanDetails;
  