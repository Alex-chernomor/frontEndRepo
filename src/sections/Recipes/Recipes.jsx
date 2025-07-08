import { useSelector } from "react-redux";
import RecipesList from "../../components/RecipesList/RecipesList.jsx";
// import RecipesFilters from "../../components/RecipesFilters/RecipesFilters.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import Button from "../../components/Button/Button.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import {
  selectRecipes,
  selectIsLoading,
} from "../../redux/recipes/selectors.js";
import css from "./Recipes.module.css";
import ResponsiveFilters from "../../components/ResponsiveFilters/ResponsiveFilters.jsx";

const Recipes = ({
  searchTerm,
  onLoadMore,
  isLoadMoreVisible,
  isLoadMoreDisabled,
  categoryParam,
  ingredientIdParam,
  updateSearchParams,
  resetFilters,
}) => {
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectIsLoading);

  return (
    <section className={css.recipes}>
      <div className={css.container}>
        <div className={css.box}>
          <SectionTitle>
            {searchTerm?.trim()
              ? `Search results for "${searchTerm.trim()}"`
              : "Recipes"}
          </SectionTitle>
          <ResponsiveFilters
            categoryParam={categoryParam}
            ingredientIdParam={ingredientIdParam}
            onChangeSearchParams={updateSearchParams}
            onResetFilters={resetFilters}
          />
          {isLoading && <Loader />}
          {recipes.length > 0 && <RecipesList />}
          {isLoadMoreVisible && (
            <Button
              type="button"
              className={css.button}
              onClick={onLoadMore}
              disabled={isLoadMoreDisabled}
            >
              Load More
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Recipes;
