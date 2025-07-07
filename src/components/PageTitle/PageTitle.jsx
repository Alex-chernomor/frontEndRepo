import styles from "./PageTitle.module.css";
const PageTitle = ({ children, variant }) => {
  return <h2 className={`${styles.title} ${styles[variant]}`}>{children}</h2>;
};

export default PageTitle;
