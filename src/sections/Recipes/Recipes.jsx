import RecipesList from '../../components/RecipesList/RecipesList.jsx';
import RecipesFilters from '../../components/RecipesFilters/RecipesFilters.jsx';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import Button from '../../components/Button/Button.jsx';
import { selectRecipes } from '../../redux/recipes/selectors.js';
import { useSelector } from 'react-redux';

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

  return (
    <section className={css.recipes}>
      <div className={css.container}>
        <div className={css.box}>
          <SectionTitle>Recipes</SectionTitle>
          <RecipesFilters
            categoryParam={categoryParam}
            ingredientIdParam={ingredientIdParam}
            onChangeSearchParams={updateSearchParams}
            onResetFilters={resetFilters}
          />
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
