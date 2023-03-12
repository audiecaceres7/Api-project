import { pokemon } from "./fetch";

export function removeElement(arr: any, value: pokemon): pokemon {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    };
    return arr;
};
  
  