import { useParams } from 'react-router-dom';
import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';
import { useEffect, useState } from 'react';
import { fetchRecipeDetails } from '../../recipesService';
import Loader from '../../components/Loader/Loader';
import { ErrorMessage } from 'formik';
import Header from '../../sections/Header/Header';

export default function RecipeViewPage() {
  const { recipeId } = useParams;
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!recipeId) {
      return;
    }
    const getRecipeDetails = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await fetchRecipeDetails(recipeId);
        setRecipe(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getRecipeDetails();
  }, [recipeId]);
  return (
    <>
      <Header />
      {isLoading && <Loader />}
      {/* ErrorMessage можна якось замінити чи покращити */}
      {error && <ErrorMessage />}
      <RecipeDetails recipe={recipe} />
    </>
  );
}
