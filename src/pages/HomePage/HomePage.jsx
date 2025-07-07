import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Hero from "../../sections/Hero/Hero.jsx";
import Recipes from "../../sections/Recipes/Recipes.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";
import {
  fetchRecipes,
  fetchCategories,
  fetchIngredients,
} from "../../redux/recipes/operations.js";
import {
  selectRecipes,
  selectPage,
  selectPerPage,
  selectTotalPages,
  selectIsLoading,
  selectError,
} from "../../redux/recipes/selectors.js";
import css from "./HomePage.module.css";
export default function HomePage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const recipes = useSelector(selectRecipes);
  const page = useSelector(selectPage);
  const perPage = useSelector(selectPerPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const categoryParam = searchParams.get("category") || "";
  const ingredientIdParam = searchParams.get("ingredientId") || "";
  const pageParam = parseInt(searchParams.get("page") || 1);
  // Загружаем справочники (категории, ингредиенты)
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
  }, [dispatch]);
  // Загружаем рецепты при изменении параметров фильтрации
  useEffect(() => {
    dispatch(
      fetchRecipes({
        page: pageParam,
        perPage,
        category: categoryParam,
        ingredientId: ingredientIdParam,
      })
    );
  }, [dispatch, pageParam, perPage, categoryParam, ingredientIdParam]);
  // Обновление URL параметров
  const updateSearchParams = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);
    if (value) {
      updatedParams.set(key, value);
    } else {
      updatedParams.delete(key);
    }
    updatedParams.set("page", 1);
    setSearchParams(updatedParams);
  };
  // Сброс фильтров
  const handleResetFilters = () => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete("category");
    updatedParams.delete("ingredientId");
    updatedParams.set("page", 1);
    setSearchParams(updatedParams);
  };
  // Пагинация
  const handleLoadMoreClick = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      const currentPage = parseInt(prev.get("page") || 1);
      newParams.set("page", currentPage + 1);
      return newParams;
    });
  };
  const isLoadMoreVisible =
    page < totalPages && !isLoading && !error && recipes.length > 0;
  return (
    <div className={css.wrapper}>
      <Hero />
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <div className="container">
          <Recipes
            onLoadMore={handleLoadMoreClick}
            isLoadMoreVisible={isLoadMoreVisible}
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
