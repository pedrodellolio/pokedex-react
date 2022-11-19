export interface Dictionary<T> {
  [Key: string]: T;
}

export const typeColor: Dictionary<string> = {
  NORMAL: "#a4acaf",
  FIGHTING: "#d56723",
  FLYING: "#3dc7ef",
  POISON: "#b97fc9",
  GROUND: "#ab9842",
  ROCK: "#a38c21",
  BUG: "#729f3f",
  GHOST: "#7b62a3",
  STEEL: "#9eb7b8",
  FIRE: "#fd7d24",
  WATER: "#4592c4",
  GRASS: "#9bcc50",
  ELECTRIC: "#eed535",
  PSYCHIC: "#f366b9",
  ICE: "#51c4e7",
  DRAGON: "#53a4cf",
  DARK: "#707070",
  FAIRY: "#fdb9e9",
  UNKNOWN: "",
  SHADOW: "",
};
