import Image from "next/image";
import Head from "next/head";
import "./globals.css";
import Link from "next/link";

// Fetch Data Function
async function fetchPokemons() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
  const { results } = await res.json();
  const pokemon = results.map((result, index) => {
    const id = index + 1;
    const paddedIndex = ("00" + (index + 1)).slice(-3);
    const image = `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${paddedIndex}.png`;
    return {
      ...result,
      id,
      image,
    };
  });
  return pokemon;
}

// Home Component
export default async function Home() {
  const pokemons = await fetchPokemons();

  return (
    <div className="container mx-auto p-4">
      <div className="mx-auto flex justify-center mb-4">
        <Image src="/pokedex-logo.png" width={300} height={300} className="p-4" />
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon, index) => (
          <li key={index} className="mb-2">
            <Link href={`/pokemon/${index + 1}`} className="block text-center bg-slate-400 rounded-md py-4">
              <img src={pokemon.image} alt={pokemon.name} className="w-28 h-28 mx-auto" />
              <span className="text-blue-500 hover:underline">#{pokemon.id}</span>
              <br />
              <span className="text-yellow-300 text-lg hover:underline capitalize">{pokemon.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
