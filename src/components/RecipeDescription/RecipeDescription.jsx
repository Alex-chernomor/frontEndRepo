import styles from './RecipeDescription.module.css';
import { useIngredients } from '../../context/useIngredients';

const RecipeDescription = ({ description, instructions, ingredients = [] }) => {
  const allIngredients = useIngredients();

  const getIngredientName = id => {
    const found = allIngredients.find(item => item._id === id);
    return found?.name || 'Unknown ingredient';
  };
  return (
    <ul className={styles.sectionList}>
      <li className={styles.container}>
        <p className={styles.header}>About recipe</p>
        <p className={styles.text}>{description}</p>
      </li>
      <li className={styles.container}>
        <p className={styles.header}>Ingredients:</p>
        <ul className={styles.list}>
          {ingredients.map(({ id, measure }) => (
            <li key={id} className={styles.item}>
              <p className={styles.text}>
                • {getIngredientName(id)} - {measure}
              </p>
            </li>
          ))}
        </ul>
      </li>
      <li className={styles.container}>
        <p className={styles.header}>Preparation Steps:</p>
        <p className={styles.text}>{instructions}</p>
      </li>
    </ul>
  );
};

export default RecipeDescription;
