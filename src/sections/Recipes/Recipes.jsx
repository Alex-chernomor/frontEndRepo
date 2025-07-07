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

import css from './Recipes.module.css';

const Recipes = ({ onLoadMore, isLoadMoreVisible, isLoadMoreDisabled }) => {
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectIsLoading);

  return (
    <section className={css.recipes}>
      <div className={css.container}>
        <div className={css.box}>
          <SectionTitle>Recipes</SectionTitle>

          {isLoading && recipes.length === 0 && (
            <p className={css.text}>...Loading</p>
          )}
          <RecipesFilters />
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
