import Link from "next/link";
import React from "react";

// Fetch Data Function
async function fetchPokemon(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch data for Pokemon ID ${id}`);
  }
  const pokemon = await res.json();
  const paddedId = ("00" + id).slice(-3);
  pokemon.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
  return pokemon;
}

export default async function PokemonDetail({ params }) {
  const { id } = params;
  let pokemon;

  try {
    pokemon = await fetchPokemon(id);
  } catch (error) {
    console.error(error);
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-4xl mb-2 text-center">Error</h1>
        <p className="text-center">Failed to load Pokémon details. Please try again later.</p>
      </div>
    );
  }

  const formattedWeight = (pokemon.weight / 10).toFixed(1);

  return (
    <div className="container mx-auto p-6 m-6">
      <h1 className="text-3xl mb-4 text-center capitalize text-yellow-300">
        #{pokemon.id} {pokemon.name}
      </h1>
      <div className="w-1/2 container mx-auto p-8 border-2 border-gray-300 rounded-lg shadow-lg">
        <img className="mx-auto" src={pokemon.image} alt={pokemon.name} />
        <div className="flex justify-center space-x-4">
          <p>
            <span className="font-bold">EXP:</span> {pokemon.base_experience}
          </p>
          <p>
            <span className="font-bold">Height:</span> {pokemon.height}0 cm
          </p>
          <p>
            <span className="font-bold">Weight:</span> {formattedWeight} kg
          </p>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold mt-6 mb-2">Types</h2>
          {pokemon.types.map((type, index) => (
            <p key={index} className="uppercase mr-1 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
              {type.type.name}
            </p>
          ))}
          <h2 className="text-lg font-bold mt-6 mb-2">Abilities</h2>
          {pokemon.abilities.map((ability, index) => (
            <p key={index} className="uppercase mr-1 inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
              {ability.ability.name}
              {ability.is_hidden}
            </p>
          ))}
        </div>
      </div>

      <p className="mt-16 text-center">
        <Link href="/" className="text-2xl underline">
          Home
        </Link>
      </p>
    </div>
  );
}
