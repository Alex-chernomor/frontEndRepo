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


// import Hero from '../../sections/Hero/Hero.jsx';
// import Recipes from '../../sections/Recipes/Recipes.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
// import {
//   fetchRecipes,
//   fetchCategories,
  // fetchIngredients,
// } from '../../redux/recipes/operations.js';

// import { useDispatch, useSelector } from 'react-redux';
// import { resetFilters } from '../../redux/filters/slice.js';

import {
  selectRecipes,
  selectPage,
  selectPerPage,
  selectTotalPages,
  selectIsLoading,
  selectError,
} from '../../redux/recipes/selectors.js';
// <<<<<<< Larysa0707
import css from './HomePage.module.css';
// =======
import { useSearchParams } from 'react-router-dom';
// >>>>>>> main

export default function HomePage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const recipes = useSelector(selectRecipes);
  const page = useSelector(selectPage);
  const perPage = useSelector(selectPerPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

// <<<<<<< Larysa0707
  useEffect(() => {
    dispatch(fetchRecipesByName());
    dispatch(fetchRecipes({ page: 1, perPage }));
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch, perPage]);
// =======
  // categoryParam повертає _id категорії
  const categoryParam = searchParams.get('category') || '';
  const ingredientIdParam = searchParams.get('ingredientId') || '';
  const pageParam = parseInt(searchParams.get('page') || 1);
  // const queryParam = searchParams.get('query') || '';

  const updateSearchParams = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);
    if (value) {
      updatedParams.set(key, value);
    } else {
      // Це треба аби
      updatedParams.delete(key);
    }
    //Аби при фільтрації завжди починати з першої сторінки
    updatedParams.set('page', 1);
    setSearchParams(updatedParams);
  };
  const handleResetFilters = () => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete('category');
    updatedParams.delete('ingredientId');
    updatedParams.set('page', 1);
    setSearchParams(updatedParams);
  };
// >>>>>>> main

  const handleLoadMoreClick = () => {
    setSearchParams(prevValue => {
      const newParams = new URLSearchParams(prevValue);
      const currentPage = parseInt(prevValue.get('page') || 1);
      newParams.set('page', currentPage + 1);
      //треба повертати аби setSearchParams отримав нові парамери
      return newParams;
    });
    // dispatch(fetchRecipes({ page: pageParam + 1, perPage }));
  };

// <<<<<<< Larysa0707
  // const isVisible =
  //   page < totalPages && !isLoading && !error && recipes.length > 0;
// =======
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    try {
      dispatch(
        fetchRecipes({
          page: pageParam,
          perPage,
          category: categoryParam,
          ingredientId: ingredientIdParam,
          // query: queryParam,
        })
      ).unwrap();
    } catch (error) {
      console.error('Error is:', error.message);
    }
  }, [categoryParam, dispatch, ingredientIdParam, pageParam, perPage]);
// >>>>>>> main

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
// <<<<<<< Larysa0707

      {!isLoading && !error && (
        <Recipes
          onLoadMore={handleLoadMoreClick}
          isLoadMoreVisible={isLoadMoreButtonVisible}
          isLoadMoreDisabled={isLoading}
        />
// =======
      {error && <ErrorMessage />}
      {!isLoading && !error && (
        <div className="container">
          <Recipes
            onLoadMore={handleLoadMoreClick}
            isLoadMoreVisible={isVisible}
            isLoadMoreDisabled={isLoading}
            categoryParam={categoryParam}
            ingredientIdParam={ingredientIdParam}
            updateSearchParams={updateSearchParams}
            resetFilters={handleResetFilters}
          />
        </div>
// >>>>>>> main
      )}
      {/* {isLoading && recipes.length === 0 && (
        <p className={css.text}>...Loading</p>
      )} */}
    </div>
  );
}
