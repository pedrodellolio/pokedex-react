import { BaseResourceList } from "../../models/baseResource";
import { Region } from "../../models/pokedex";
import { AxiosInstance } from "axios";
import { setup } from "axios-cache-adapter";
import { api } from "../constants/api";

export class RegionController {
  public axios: AxiosInstance;

  constructor() {
    this.axios = setup({
      baseURL: api.BASE_URL,
      cache: {
        maxAge: 15 * 60 * 1000,
      },
    });
  }

  public async getAllRegions(): Promise<BaseResourceList> {
    return new Promise<BaseResourceList>((resolve, reject) => {
      this.axios
        .get<BaseResourceList>(`/region/`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  public async getRegionById(id: number): Promise<Region> {
    return new Promise<Region>((resolve, reject) => {
      this.axios
        .get<Region>(`/region/${id}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  public async getRegionByName(name: string): Promise<Region> {
    return new Promise<Region>((resolve, reject) => {
      this.axios
        .get<Region>(`/region/${name}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }
}
