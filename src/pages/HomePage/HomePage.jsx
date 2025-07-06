import { useEffect, useState } from 'react';

import Header from '../../sections/Header/Header.jsx';
import Hero from '../../sections/Hero/Hero.jsx';
import Recipes from '../../sections/Recipes/Recipes.jsx';
// import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';

import { fetchRecipesByName } from '../../redux/recipes/operations.js';

import {
  fetchRecipes,
  fetchCategories,
  fetchIngredients,
  fetchRecipesByFilters,
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

export default function HomePage() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const page = useSelector(selectPage);
  const perPage = useSelector(selectPerPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  useEffect(() => {
    dispatch(fetchRecipesByName());
  }, [dispatch]);
    dispatch(fetchRecipes({ page, perPage }));
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
    dispatch(
      fetchRecipesByFilters({
        category: selectedCategory?.value || '',
        ingredient: selectedIngredient?.value || '',
      })
    );
  }, [dispatch, page, perPage, selectedCategory, selectedIngredient]);

  const handleLoadMoreClick = () => {
    dispatch(fetchRecipes({ page: page + 1, perPage }));
  };

  // const handleReset = () => {
  //   dispatch(resetFilters());
  // };

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
      {/* {error && <ErrorMessage />} */}
      {!isLoading && !error && (
        <Recipes
          onLoadMore={handleLoadMoreClick}
          isLoadMoreVisible={isVisible}
          isLoadMoreDisabled={isLoading}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedIngredient={selectedIngredient}
          setSelectedIngredient={setSelectedIngredient}
        />
      )}
    </div>
  );
}
