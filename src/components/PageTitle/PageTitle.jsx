import styles from './PageTitle.module.css';
const PageTitle = ({ children, variant }) => {
  return <h1 className={`${styles.title} ${styles[variant]}`}>{children}</h1>;
};

export default PageTitle;
