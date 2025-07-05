import styles from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <b className={styles.errorMessage}>
      Whoops, something went wrong! Please try reloading this page!
    </b>
  );
};

export default ErrorMessage;
