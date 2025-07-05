import RecipeInfo from '../../sections/RecipeInfo/RecipeInfo';
// import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { fetchRecipeDetails } from '../../recipesService';
import Loader from '../../components/Loader/Loader';

export default function RecipeViewPage() {
  // const { recipeId } = useParams();
  // const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const recipe = {
    title: 'Teriyaki Chicken Casserole',
    category: 'Chicken',
    area: 'Japanese',
    instructions:
      'Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick sp…',
    description:
      'A Japanese-inspired casserole made with chicken, teriyaki sauce, rice,…',
    thumb:
      'https://ftp.goit.study/img/so-yummy/preview/Teriyaki%20Chicken%20Casserole.jpg',
    time: '75',
  };

  // useEffect(() => {
  //   if (!recipeId) {
  //     return;
  //   }
  //   const getRecipeDetails = async () => {
  //     setIsLoading(true);
  //     setError(false);
  //     try {
  //       const data = await fetchRecipeDetails(recipeId);
  //       setRecipe(data);
  //     } catch (error) {
  //       console.error(error.message);
  //       setError(true);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   getRecipeDetails();
  // }, [recipeId]);
  return (
    <>
      {isLoading && <Loader />}
      {/* ErrorMessage можна якось замінити чи покращити */}
      {error && <ErrorMessage />}
      {/* {!isLoading && !error && recipe && <RecipeInfo recipe={recipe} />} */}
      <RecipeInfo recipe={recipe} />
    </>
  );
}
