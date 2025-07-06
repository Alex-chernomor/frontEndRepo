import { useEffect } from 'react';
import Header from '../../sections/Header/Header.jsx';
import Hero from '../../sections/Hero/Hero.jsx';
import Recipes from '../../sections/Recipes/Recipes.jsx';
// import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import { fetchRecipesByName } from '../../redux/recipes/operations.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectIsLoading } from '../../redux/recipes/selectors.js';

export default function HomePage() {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipesByName());
  }, [dispatch]);
  return (
    <div>
      <Hero />
      {/* {error && <ErrorMessage />} */}
      {!isLoading && !error && <Recipes />}
    </div>
  );
}
