import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';

const RecipeInfo = ({ recipe }) => {
  return (
    <>
      <RecipeDetails {...recipe} />
    </>
  );
};

export default RecipeInfo;
