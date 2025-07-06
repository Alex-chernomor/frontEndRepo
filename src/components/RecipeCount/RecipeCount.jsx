import css from "./RecipeCount.module.css";

export const RecipeCount = ({ count }) => {
  return <p className={css.count}>{count} recipes</p>;
};
