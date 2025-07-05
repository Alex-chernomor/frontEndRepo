import RecipesList from '../../components/RecipesList/RecipesList.jsx';
import RecipesFilters from '../../components/RecipesFilters/RecipesFilters.jsx';
import SectionTitle from '../../components/SectionTitle/SectionTitle.jsx';
import css from './Recipes.module.css';

const Recipes = () => {
  return (
    <section className={css.recipes}>
      <div className={css.container}>
        <SectionTitle>Recipes</SectionTitle>
        <RecipesFilters />
        <RecipesList />
      </div>
    </section>
  );
};

export default Recipes;
