import css from './Logo.module.css';

export default function Logo() {
  return (
    <div className={css.container}>
      <div className={css.logo}>
        <svg className={css.icon} height="46">
          <use href="/logo.svg" />
        </svg>
        <p>Tasteorama</p>
      </div>
    </div>
  );
}
