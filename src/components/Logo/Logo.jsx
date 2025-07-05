import css from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={css.container}>
      <svg height="30" width="32">
        <use className={css.icon} href="/logo.svg" />
      </svg>
      <p className={css.logoTitle}>Tasteorama</p>
    </div>
  );
}
