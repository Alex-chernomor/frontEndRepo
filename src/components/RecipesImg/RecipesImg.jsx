import styles from './RecipesImg.module.css';
const RecipesImg = ({ thumb, title }) => {
  const defaultImg =
    'https://images.unsplash.com/photo-1591632288574-a387f820a1ca?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const ingSrc = thumb?.trim() || defaultImg;
  return (
    <div className={styles.thumb}>
      <img src={ingSrc} width={1225} alt={title} className={styles.img} />
    </div>
  );
};

export default RecipesImg;
