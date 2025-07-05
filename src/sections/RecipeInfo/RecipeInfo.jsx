import RecipeDetails from '../../components/RecipeDetails/RecipeDetails';

const RecipeInfo = ({ recipe }) => {
  return (
    <div>
      <RecipeDetails {...recipe} />
    </div>
  );
};

export default RecipeInfo;
