import { useLocation } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";  

const PokemanDetails = () => {
  const location = useLocation(); 
  const pokemonUrl = location.state?.pokemonUrl;

  const {data:pokemonDetails,isLoading,isError} = useQuery(
    ['pokemonDetails',pokemonUrl],
    async () => {
      if(!pokemonUrl){
        throw new Error("no pokeman url available");
      }
      const response = await axios.get(pokemonUrl);
      return response.data;  
    }
  );  

  if (isLoading) {
    return <p>Loading Pokémon details...</p>;
  }  
  
  if (isError) {
    return <p>Error fetching Pokémon details.</p>;
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
    