import { useEffect } from 'react';

import Header from '../../sections/Header/Header.jsx';
import Hero from '../../sections/Hero/Hero.jsx';
import Recipes from '../../sections/Recipes/Recipes.jsx';
import Loader from '../../components/Loader/Loader.jsx';

import {
  fetchRecipes,
  fetchCategories,
  fetchIngredients,
  fetchRecipesByName,
} from '../../redux/recipes/operations.js';

import { useDispatch, useSelector } from 'react-redux';

import {
  selectRecipes,
  selectPage,
  selectPerPage,
  selectTotalPages,
  selectIsLoading,
  selectError,
} from '../../redux/recipes/selectors.js';
// import css from './HomePage.module.css';

export default function HomePage() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const page = useSelector(selectPage);
  const perPage = useSelector(selectPerPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchRecipesByName());
    dispatch(fetchRecipes({ page: 1, perPage }));
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch, perPage]);

  const handleLoadMoreClick = () => {
    dispatch(fetchRecipes({ page: page + 1, perPage }));
  };

  // const isVisible =
  //   page < totalPages && !isLoading && !error && recipes.length > 0;

  const isLoadMoreButtonVisible =
    page < totalPages && !error && recipes.length > 0;

  // console.log(
  //   'page:',
  //   page,
  //   'totalPages:',
  //   totalPages,
  //   'recipes.length:',
  //   recipes.length,
  //   'isLoading:',
  //   isLoading,
  //   'error:',
  //   error
  // );
  return (
    <div>
      <Hero />

      {!isLoading && !error && (
        <Recipes
          onLoadMore={handleLoadMoreClick}
          isLoadMoreVisible={isLoadMoreButtonVisible}
          isLoadMoreDisabled={isLoading}
        />
      )}
      {/* {isLoading && recipes.length === 0 && (
        <p className={css.text}>...Loading</p>
      )} */}
    </div>
  );
}
