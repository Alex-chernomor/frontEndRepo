import css from './RecipeCount.module.css';

const count = 12;

export const RecipeCount = () => {
  return <p className={css.count}>{count} recipes</p>;
};
