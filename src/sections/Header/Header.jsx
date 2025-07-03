import React from 'react';
import Logo from '../../components/Logo/Logo.jsx';
import { NavLink } from 'react-router-dom';
import AppBar from '../../components/AppBar/AppBar.jsx';
import css from './Header.module.css';

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
