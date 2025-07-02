import { Link } from 'react-router-dom';
import css from './Logo.module.css';

export default function Logo() {
  return (
    <Link to="/" className={css.link}>
      <svg className={css.icon} width="165" height="46">
        <use href="/sprite.svg#icon-logo" />
      </svg>
    </Link>
  );
}
