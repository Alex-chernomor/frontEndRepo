import styles from './RecipeDescription.module.css';
// import { useIngredients } from '../../context/useIngredients';

const RecipeDescription = ({
  description,
  instructions,
  ingredients = [
    {
      id: 1,
      measure: '10g',
      name: 'onion',
    },
  ],
}) => {
  //   const allIngredients = useIngredients();

  //   const getIngredientName = id => {
  //     allIngredients.find(item => item._id === id)?.name || 'Unknown ingredient';
  //   };
  return (
    <ul className={styles.sectionList}>
      <li className={styles.container}>
        <p className={styles.header}>About recipe</p>
        <p className={styles.text}>{description}</p>
      </li>
      <li className={styles.container}>
        <p className={styles.header}>Ingredients:</p>
        <ul className={styles.list}>
          {ingredients.map(({ id, measure, name }) => (
            <li key={id} className={styles.item}>
              <p className={styles.text}>
                {/* • {getIngredientName(id)} - {measure} */}• {name} -{' '}
                {measure}
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
