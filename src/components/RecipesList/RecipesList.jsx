import { useSelector } from "react-redux";

import { selectRecipes } from "../../redux/recipes/selectors.js";
import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import css from "./RecipesList.module.css";

const RecipesList = () => {
  const recipes = useSelector(selectRecipes);

  console.log("recipes:", recipes);

  return (
    <div className={css.recipesWrap}>
      <ul className={css.list}>
        {recipes.data.map((recipe) => (
          <li key={recipe._id}>
            <RecipeCard {...recipe} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipesList;
