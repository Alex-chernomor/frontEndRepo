import { useDispatch, useSelector } from "react-redux";
import { RecipeCount } from "../RecipeCount/RecipeCount";
import { useEffect } from "react";
import {
  selectError,
  selectIsLoading,
  selectPage,
  selectTotalItems,
  selectTotalPages,
} from "../../redux/recipes/selectors";
import RecipesList from "../RecipesList/RecipesList";
import { fetchOwnRecipes } from "../../redux/recipes/operations";
import Button from "../Button/Button";
import { useSearchParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.jsx";

const OwnRecipes = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const total = useSelector(selectTotalItems);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    try {
      const pageParam = parseInt(searchParams.get("page") || 1);
      dispatch(fetchOwnRecipes({ page: pageParam, perPage: 12 }));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, searchParams]);

  const handleButtonClick = () => {
    setSearchParams((prevValue) => {
      const newParams = new URLSearchParams(prevValue);
      const currentPage = parseInt(prevValue.get("page") || 1);
      newParams.set("page", currentPage + 1);

      return newParams;
    });
  };

  return (
    <>
      <RecipeCount count={total} />
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      {!isLoading && !error && <RecipesList />}

      {!isLoading && totalPages > page && (
        <Button
          variant="darkButton"
          className="loadMoreBtn"
          onClick={handleButtonClick}
        >
          Load More
        </Button>
      )}
    </>
  );
};

export default OwnRecipes;
