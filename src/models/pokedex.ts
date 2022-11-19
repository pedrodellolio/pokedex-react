import { BaseResource } from "./baseResource";
import { PokemonEntry } from "./pokemon";

export interface Pokedex {
    id: number;
    name: string;
    pokemon_entries: PokemonEntry[];
    region: BaseResource | null;
}

export interface Region {
    id: number;
    name: string;
    pokedexes: BaseResource[];
}