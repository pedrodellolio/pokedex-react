export interface BaseResource {
    name: string;
    url: string;
}

export interface BaseResourceList {
    results: BaseResource[];
}