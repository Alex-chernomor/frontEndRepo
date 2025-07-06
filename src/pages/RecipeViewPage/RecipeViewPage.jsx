import RecipeInfo from '../../sections/RecipeInfo/RecipeInfo';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRecipeById } from '../../recipesService';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function RecipeViewPage() {
  const { recipeId } = useParams();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    if (!recipeId) {
      return;
    }
    const getRecipeDetails = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await getRecipeById(recipeId);
        setRecipe(data);
      } catch (error) {
        console.error(error.message);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getRecipeDetails();
  }, [recipeId]);

  return (
    <>
      {isLoading && <Loader />}
      {/* ErrorMessage можна якось замінити чи покращити */}
      {error && <ErrorMessage />}
      {!isLoading && !error && recipe && <RecipeInfo recipe={recipe} />}
    </>
  );
}
