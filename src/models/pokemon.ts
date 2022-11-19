import { BaseResource } from "./baseResource";

export interface Pokemon {
  id: number;
  height: number;
  name: string;
  abilities: Ability[];
  stats: Stat[];
  types: Type[];
  sprites: Sprites;
}

export interface Ability {
  is_hidden: boolean;
  slot: number;
  ability: BaseResource;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: BaseResource;
}

export interface Type {
  slot: number;
  type: BaseResource;
}

export interface Sprites {
  back_default: string | null;
  front_default: string | null;
  other: {
    home: {
      front_default: string | null;
    };
  };
}

export interface PokemonEntry {
  entry_number: number;
  pokemon_species: BaseResource | null;
}

export interface PokemonSpecie {
  id: number;
  varieties: Variety[];
}

export interface Variety {
  is_default: boolean;
  pokemon: BaseResource;
}