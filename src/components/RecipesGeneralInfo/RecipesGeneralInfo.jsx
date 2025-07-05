import styles from './RecipesGeneralInfo.module.css';
const RecipesGeneralInfo = ({ category, time, cals, area }) => {
  return (
    <div className={styles.card}>
      <p className={styles.header}>General information</p>
      <p className={styles.text}>
        Category: <span className={styles.info}>{category}</span>
      </p>
      <p className={styles.text}>
        Cooking time:{' '}
        <span className={styles.info}>
          {time} {time === 1 ? 'minute' : 'minutes'}
        </span>
      </p>
      <p className={styles.text}>
        Caloric content:
        {cals ? (
          <span className={styles.info}>
            Approximately {cals} kcal per serving
          </span>
        ) : (
          <span className={styles.info}> - </span>
        )}
      </p>
      {area && (
        <p className={styles.text}>
          Area: <span className={styles.info}>{area}</span>
        </p>
      )}
    </div>
  );
};

export default RecipesGeneralInfo;
