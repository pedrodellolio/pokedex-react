import { setup } from "axios-cache-adapter";
import { Pokemon, PokemonSpecie, Variety } from "../../models/pokemon";
import { AxiosInstance } from "axios";
import { BaseResource } from "../../models/baseResource";
import { api } from "../constants/api";
import { RegionController } from "./RegionController";
import { PokedexController } from "./PokedexController";

export class PokemonController {
  public axios: AxiosInstance;
  public regionController: RegionController;
  public pokedexController: PokedexController;

  constructor() {
    this.axios = setup({
      baseURL: api.BASE_URL,
      cache: {
        maxAge: 15 * 60 * 1000,
      },
    });

    this.regionController = new RegionController();
    this.pokedexController = new PokedexController();
  }

  public async getPokemonById(id: number): Promise<Pokemon> {
    return new Promise<Pokemon>((resolve, reject) => {
      this.axios
        .get<Pokemon>(`/pokemon/${id}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  public async getPokemonByName(name: string): Promise<Pokemon | null> {
    return new Promise<Pokemon>((resolve, reject) => {
      this.axios
        .get<Pokemon>(`/pokemon/${name}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => reject(error));
    });
  }

  public async getPokemonEntriesByRegionId(
    id: number
  ): Promise<BaseResource[]> {
    let entries = [] as BaseResource[];
    const region = await this.regionController.getRegionById(id);
    const latestPokedex = await this.pokedexController.getPokedexByName(
      region.pokedexes[region.pokedexes.length - 1].name
    );

    for (let entry of latestPokedex.pokemon_entries) {
      if (entry.pokemon_species != null) entries.push(entry.pokemon_species);
    }

    return entries;
  }

  public async getPokemonSpecieByName(name: string): Promise<PokemonSpecie> {
    return new Promise<PokemonSpecie>((resolve, reject) => {
      this.axios
        .get<PokemonSpecie>(`/pokemon-species/${name}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => reject(error));
    });
  }

  public async getPokemonsByRegionName(name: string): Promise<Pokemon[]> {
    const region = await this.regionController.getRegionByName(name);
    const latestPokedex = await this.pokedexController.getPokedexByName(
      region.pokedexes[region.pokedexes.length - 1].name
    );

    const pokemonsPromises = latestPokedex.pokemon_entries.map(
      async (entry) => {
        if (entry.pokemon_species != null) {
          // if (this.getPokemonByName(entry.pokemon_species.name) === null) {
          //   console.log(entry.pokemon_species.name + " == null");
          // }
          const pokemonSpecie = await this.getPokemonSpecieByName(
            entry.pokemon_species.name
          );
          const pokemonDefault = pokemonSpecie.varieties.find(
            (s) => s.is_default
          ) as Variety;

          return this.getPokemonByName(pokemonDefault.pokemon.name);
        }
      }
    );

    const results = (await Promise.all(pokemonsPromises)) as Pokemon[];
    // console.log(results);
    return (await Promise.all(pokemonsPromises)) as Pokemon[];
  }
}
