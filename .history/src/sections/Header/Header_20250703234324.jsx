...mport React from "react";
import Logo from "../../components/Logo/Logo.jsx";
import { NavLink } from "react-router-dom";
import AppBar from "../../components/AppBar/AppBar.jsx";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <section className={css.sectionHeader}>
        <div className={css.headerContainer}>
          <Logo />
          <nav className={css.navigation}>
            <NavLink to="/" className={css.reipeLink}>
              Recipes
            </NavLink>
            <AppBar className={css.appbar} />
          </nav>
        </div>
      </section>
    </header>
  );
}

.header {
  background: #3d2218;
  width: 100%;
  display: flex;
  justify-content: center;
}

.sectionHeader {
  width: 1440px;
  display: flex;
  justify-content: center;
}

.headerContainer {
  display: flex;
  justify-content: center;
  justify-content: space-between;
  width: 1230px;
}

.navigation {
  display: flex;
  align-items: center;
}

.reipeLink {
  margin-right: 13px;
  color: white;
}

.appbar {
  display: flex;
  justify-content: center;
  height: auto;
}
