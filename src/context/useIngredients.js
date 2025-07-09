import { useContext } from "react";
import { IngredientsContext } from "./IngredientsContext.jsx";

export const useIngredients = () => {
  return useContext(IngredientsContext);
};
