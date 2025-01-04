import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const PokemonCard = ({ pokemon }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Pokémon Card */}
      <Card
        onClick={() => setModalOpen(true)}
        className="p-4 bg-white shadow-lg rounded-lg text-center hover:shadow-xl transition-shadow cursor-pointer"
      >
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-24 h-24 mx-auto"
        />
        <h2 className="text-lg font-semibold mt-2 capitalize">{pokemon.name}</h2>
      </Card>

      {/* Modal for Pokémon Details */}
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold capitalize">
                {pokemon.name}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
                className="w-40 h-40 mx-auto"
              />
              <ul className="mt-4 space-y-2 text-gray-700">
                <li>
                  <strong>Type:</strong> {pokemon.types.map((t) => t.type.name).join(", ")}
                </li>
                <li>
                  <strong>Height:</strong> {pokemon.height / 10} m
                </li>
                <li>
                  <strong>Weight:</strong> {pokemon.weight / 10} kg
                </li>
                <li>
                  <strong>Abilities:</strong>{" "}
                  {pokemon.abilities.map((a) => a.ability.name).join(", ")}
                </li>
              </ul>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default PokemonCard;
