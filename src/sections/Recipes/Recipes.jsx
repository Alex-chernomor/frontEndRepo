import RecipesList from "../../components/RecipesList/RecipesList.jsx";
import RecipesFilters from "../../components/RecipesFilters/RecipesFilters.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";

const Recipes = () => {
  return (
    <div>
      <SectionTitle>Recipes</SectionTitle>
      <RecipesFilters />
      <RecipesList />
    </div>
  );
};

export default Recipes;
