import { useDispatch, useSelector } from "react-redux";
import { RecipeCount } from "../RecipeCount/RecipeCount";
import { useEffect, useState } from "react";
import { selectRecipes, selectTotalPages } from "../../redux/recipes/selectors";
import RecipesList from "../RecipesList/RecipesList";
import { fetchOwnRecipes } from "../../redux/recipes/operations";
import Button from "../Button/Button";

const OwnRecipes = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const recipes = useSelector(selectRecipes);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    dispatch(fetchOwnRecipes(page, 12));
  }, [dispatch, page]);

  const handleButtonClick = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <RecipeCount count={recipes.length} />
      <RecipesList />
      {totalPages >= page && (
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
