import styles from './RecipeDescription.module.css';
import { useIngredients } from '../../context/ingredientsContext';

const RecipeDescription = ({ description, instructions, ingredients = [] }) => {
  const allIngredients = useIngredients();

  const getIngredientName = id => {
    allIngredients.find(item => item._id === id)?.name || 'Unknown ingredient';
  };
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.container}>
        <p className={styles.header}>About recipe</p>
        <p className={styles.text}>{description}</p>
      </div>
      <div className={styles.container}>
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
      </div>
      <div className={styles.container}>
        <p className={styles.header}>Preparation Steps:</p>
        <p className={styles.text}>{instructions}</p>
      </div>
    </div>
  );
};

export default RecipeDescription;
