// <<<<<<< Larysa0707
import RecipesList from '../../components/RecipesList/RecipesList.jsx';
import RecipesFilters from '../../components/RecipesFilters/RecipesFilters.jsx';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import Button from '../../components/Button/Button.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import {
  selectRecipes,
  selectIsLoading,
} from '../../redux/recipes/selectors.js';
import { useSelector } from 'react-redux';
// =======

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RecipesList from "../../components/RecipesList/RecipesList.jsx";
import RecipesFilters from "../../components/RecipesFilters/RecipesFilters.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import Button from "../../components/Button/Button.jsx";
import { selectRecipes } from "../../redux/recipes/selectors.js";
import { selectSearchTerm } from "../../redux/filters/selectors.js";

// import RecipesList from '../../components/RecipesList/RecipesList.jsx';
// import RecipesFilters from '../../components/RecipesFilters/RecipesFilters.jsx';
// import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
// import Button from '../../components/Button/Button.jsx';
// import { selectRecipes } from '../../redux/recipes/selectors.js';
// import { useSelector } from 'react-redux';

// >>>>>>> main

import css from './Recipes.module.css';

const Recipes = ({
  onLoadMore,
  isLoadMoreVisible,
  isLoadMoreDisabled,
  categoryParam,
  ingredientIdParam,
  updateSearchParams,
  resetFilters,
}) => {
  const recipes = useSelector(selectRecipes);
// <<<<<<< Larysa0707
  const isLoading = useSelector(selectIsLoading);
// =======
  const searchTerm = useSelector(selectSearchTerm);

  const [title, setTitle] = useState("Recipes");

  useEffect(() => {
    if (searchTerm && recipes.length > 0) {
      setTitle(`Search results for "${searchTerm}"`);
    } else {
      setTitle(`Recipes`);
    }
  }, [searchTerm, recipes]);
// >>>>>>> main

  return (
    <section className={css.recipes}>
      <div className={css.container}>
        <div className={css.box}>

//           <SectionTitle>{title}</SectionTitle>
//           <RecipesFilters />

          <SectionTitle>Recipes</SectionTitle>
// <<<<<<< Larysa0707

          {isLoading && recipes.length === 0 && (
            <p className={css.text}>...Loading</p>
          )}
          <RecipesFilters />
// =======
//           <RecipesFilters
//             categoryParam={categoryParam}
//             ingredientIdParam={ingredientIdParam}
//             onChangeSearchParams={updateSearchParams}
//             onResetFilters={resetFilters}
//           />

// >>>>>>> main
          {recipes.length > 0 && <RecipesList />}

          {isLoadMoreVisible && (
            <Button
              type="button"
              className={css.button}
              onClick={onLoadMore}
              disabled={isLoadMoreDisabled || isLoading}
            >
              {/* Load More */}
              {isLoading ? <p className={css.text}>...Loading</p> : 'Load More'}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Recipes;