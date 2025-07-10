import { useSelector } from 'react-redux';
import { selectRecipes } from '../../redux/recipes/selectors.js';
import RecipeCard from '../RecipeCard/RecipeCard.jsx';
import css from './RecipesList.module.css';
import { forwardRef } from 'react';

//! forwardRef дозволяє компоненту приймати ref як пропс
const RecipesList = forwardRef((props, ref) => {
  const recipes = useSelector(selectRecipes);

  return (
    <div className={css.recipesWrap}>
      <ul className={css.list}>
        {recipes.map((recipe, index) => (
          <li
            key={recipe._id}
            // Перевірка аби поставити ref на останній елемент списку
            ref={index === recipes.length - 1 ? ref : null}
          >
            <RecipeCard {...recipe} />
          </li>
        ))}
      </ul>
    </div>
  );
});

export default RecipesList;
