import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
    

const ITEMS_PER_PAGE = 20;

const ShowAllCard = () => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const navigate = useNavigate();

  const fetchPokemons = async (page: number) => {
    try {
      setLoading(true);
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${ITEMS_PER_PAGE}`
      );
      setPokemonList(response.data.results);
      setTotalPages(Math.ceil(response.data.count / ITEMS_PER_PAGE));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const fetchPokemonDetails = (selectedPokemonUrl: string): void => {
    navigate("/pokeman", { state: { pokemonUrl: selectedPokemonUrl } });
  };

  useEffect(() => {
    fetchPokemons(currentPage);
  }, [currentPage]);

  

  return (
    
    <div className=" min-h-screen pl-5 pb-5 w-full">
        {loading ? (     
        <div className="min-h-screen text-center pt-80">  
            <h1 className="text-green-400">Loading.....</h1>  
        </div>      
      
    ) : (
      <div className="pokemon-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4">
        {pokemonList.map((pokemon, index) => (
          <div
            className="group relative w-32 h-32 bg-gray-200 flex justify-center items-center border rounded-lg overflow-hidden mb-10 cursor-pointer"
            key={index}
            onClick={() => fetchPokemonDetails(pokemon.url)}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                (currentPage - 1) * ITEMS_PER_PAGE + index + 1
              }.png`}
              alt={pokemon.name}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 hidden w-full bg-gray-800 bg-opacity-75 text-white text-center py-2 group-hover:block">
              {pokemon.name}
            </div>
          </div>
        ))}
      </div>
    )}
      <div className="flex justify-between space-x-4 mt-4 pr-5 sticky bottom-0 ">
        <button
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed "
        >
          Next
        </button>
              
      </div>
    </div>

  );
};

export default ShowAllCard;  
  