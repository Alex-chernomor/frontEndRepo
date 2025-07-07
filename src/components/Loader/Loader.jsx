import styles from './Loader.module.css';
import { FadeLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <FadeLoader color="#9B6C43" />
    </div>
  );
}
