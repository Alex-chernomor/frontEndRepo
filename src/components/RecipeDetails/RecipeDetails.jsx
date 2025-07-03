import Button from '../Button/Button';
import PageTitle from '../PageTitle/PageTitle';
import RecipeDescription from '../RecipeDescription/RecipeDescription';
import RecipesGeneralInfo from '../RecipesGeneralInfo/RecipesGeneralInfo';
import RecipesImg from '../RecipesImg/RecipesImg';

export default function RecipeDetails({
  title,
  category,
  area,
  instructions,
  description,
  thumb,
  time,
  ingredients,
  cals,
}) {
  return (
    <div>
      <PageTitle variant="recipeTitle">{title}</PageTitle>
      <RecipesImg thumb={thumb} title={title} />
      <RecipesGeneralInfo
        category={category}
        area={area}
        time={time}
        cals={cals}
      />
      <RecipeDescription
        description={description}
        instructions={instructions}
        ingredients={ingredients}
      />
      <Button variant="darkButton">Save</Button>
    </div>
  );
}
