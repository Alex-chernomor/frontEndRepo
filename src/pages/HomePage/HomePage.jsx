import { useEffect } from 'react';
import Hero from '../../sections/Hero/Hero.jsx';
import Recipes from '../../sections/Recipes/Recipes.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import {
  fetchRecipes,
  fetchCategories,
  // fetchIngredients,
} from '../../redux/recipes/operations.js';

import { useDispatch, useSelector } from 'react-redux';
// import { resetFilters } from '../../redux/filters/slice.js';
import {
  selectRecipes,
  selectPage,
  selectPerPage,
  selectTotalPages,
  selectIsLoading,
  selectError,
} from '../../redux/recipes/selectors.js';
import { useSearchParams } from 'react-router-dom';

export default function HomePage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const recipes = useSelector(selectRecipes);
  const page = useSelector(selectPage);
  const perPage = useSelector(selectPerPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

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

  const isVisible =
    page < totalPages && !isLoading && !error && recipes.length > 0;

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
      )}
    </div>
  );
}
