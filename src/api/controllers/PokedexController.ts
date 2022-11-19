import { setup } from "axios-cache-adapter";
import { AxiosInstance } from "axios";
import { Pokedex } from "../../models/pokedex";
import { api } from "../constants/api";

export class PokedexController {
  public axios: AxiosInstance;

  constructor() {
    this.axios = setup({
      baseURL: api.BASE_URL,
      cache: {
        maxAge: 15 * 60 * 1000,
      },
    });
  }

  public async getPokedexByRegionId(
    regionId: number,
    latest?: boolean
  ): Promise<Pokedex> {
    return new Promise<Pokedex>((resolve, reject) => {
      this.axios
        .get<Pokedex>(`/pokedex/${regionId}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  public async getPokedexByName(name: string): Promise<Pokedex> {
    return new Promise<Pokedex>((resolve, reject) => {
      this.axios
        .get<Pokedex>(`/pokedex/${name}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }
}
