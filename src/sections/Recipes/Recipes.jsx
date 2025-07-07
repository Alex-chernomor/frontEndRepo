import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RecipesList from '../../components/RecipesList/RecipesList.jsx';
import RecipesFilters from '../../components/RecipesFilters/RecipesFilters.jsx';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import Button from '../../components/Button/Button.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import {
  selectRecipes,
  selectIsLoading,
} from '../../redux/recipes/selectors.js';
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
  const isLoading = useSelector(selectIsLoading);
  const [title, setTitle] = useState('Recipes');

  // useEffect(() => {
  //   if (searchTerm && recipeItems.length > 0) {
  //     setTitle(`Search results for "${searchTerm}"`);
  //   } else {
  //     setTitle('Recipes');
  //   }
  // }, [searchTerm, recipeItems]);

  return (
    <section className={css.recipes}>
      <div className={css.container}>
        <div className={css.box}>
          <SectionTitle>{title}</SectionTitle>
          <RecipesFilters
            categoryParam={categoryParam}
            ingredientIdParam={ingredientIdParam}
            onChangeSearchParams={updateSearchParams}
            onResetFilters={resetFilters}
          />
          {isLoading && <Loader />}
          {/* {recipeItems.length > 0 && <RecipesList recipes={recipeItems} />} */}
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
