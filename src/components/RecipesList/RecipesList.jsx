import css from './RecipesList.module.css';

const RecipesList = () => {
  return (
    <>
      <div className={css.recipesWrap}>
        <ul className={css.list}>
          <li>recipe1</li>
          <li>recipe2</li>
          <li>recipe3</li>
          <li>recipe4</li>
          <li>recipe5</li>
          <li>recipe6</li>
          <li>recipe7</li>
          <li>recipe8</li>
          <li>recipe9</li>
          <li>recipe10</li>
          <li>recipe11</li>
          <li>recipe12</li>
        </ul>
      </div>
    </>
  );
};

export default RecipesList;
