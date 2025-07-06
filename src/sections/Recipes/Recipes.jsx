import RecipesList from "../../components/RecipesList/RecipesList.jsx";
import RecipesFilters from "../../components/RecipesFilters/RecipesFilters.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import { selectRecipes } from "../../redux/recipes/selectors.js";
import { useSelector } from "react-redux";

const Recipes = () => {
  const recipes = useSelector(selectRecipes);
  return (
    <section>
      <div>
        <div>
          <SectionTitle>Recipes</SectionTitle>
          <RecipesFilters />
          {recipes.length > 0 && <RecipesList />}
        </div>
      </div>
    </section>
  );
};

export default Recipes;
