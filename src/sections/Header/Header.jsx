import React from "react";
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

// burder-menu-pages

// Section header
// Use LogoComponent, Recipes link, User menu or AuthNav ( {isLoggedIn ? <UserMenu /> : <AuthNav />})
import Logo from "../../components/Logo/Logo.jsx";
import { Link, NavLink } from "react-router";
import clsx from "clsx";
import css from "./Header.module.css";

import AppBar from "../../components/AppBar/AppBar.jsx";

const getLinkStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Header() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li>
          <NavLink to="/recipes" className={getLinkStyles}>
            Recipes
          </NavLink>
        </li>
        <li>
          <NavLink to="/user/profile" className={getLinkStyles}>
            My profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-recipe" className={getLinkStyles}>
            Add Recipe
          </NavLink>
        </li>
      </ul>
      {/* <img src="" alt="" /> */}
      <p>Name</p>
      <button>Logout</button>
      <AppBar />
    </div>
  );
}


// burder-menu-pages