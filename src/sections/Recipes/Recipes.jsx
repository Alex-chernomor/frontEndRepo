import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import RecipesList from "../../components/RecipesList/RecipesList.jsx";
import RecipesFilters from "../../components/RecipesFilters/RecipesFilters.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import Button from "../../components/Button/Button.jsx";
import Loader from "../../components/Loader/Loader.jsx";

import {
  selectRecipes,
  selectIsLoading,
} from "../../redux/recipes/selectors.js";
import { selectSearchTerm } from "../../redux/filters/selectors.js";

import css from "./Recipes.module.css";

const Recipes = ({ ...props }) => {
  const recipesState = useSelector(selectRecipes);
  const isLoading = useSelector(selectIsLoading);
  const searchTerm = useSelector(selectSearchTerm);

  const [title, setTitle] = useState("Recipes");

  const recipeItems = Array.isArray(recipesState?.data)
    ? recipesState.data
    : [];

  useEffect(() => {
    if (searchTerm && recipeItems.length > 0) {
      setTitle(`Search results for "${searchTerm}"`);
    } else {
      setTitle("Recipes");
    }
  }, [searchTerm, recipeItems]);

  return (
    <section className={css.recipes}>
      <div className={css.container}>
        <div className={css.box}>
          <SectionTitle>{title}</SectionTitle>

          <RecipesFilters
            categoryParam={props.categoryParam}
            ingredientIdParam={props.ingredientIdParam}
            onChangeSearchParams={props.updateSearchParams}
            onResetFilters={props.resetFilters}
          />

          {isLoading && recipeItems.length === 0 && <Loader />}

          {recipeItems.length > 0 && <RecipesList recipes={recipeItems} />}

          {props.isLoadMoreVisible && (
            <Button
              type="button"
              className={css.button}
              onClick={props.onLoadMore}
              disabled={props.isLoadMoreDisabled || isLoading}
            >
              {isLoading ? <Loader /> : "Load More"}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Recipes;
