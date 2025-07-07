import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

import Logo from "../../components/Logo/Logo.jsx";
import AppBar from "../../components/AppBar/AppBar.jsx";
import css from "./Header.module.css";
import CreateLink from "../../components/CreateLink/CreateLink.jsx";
import BurgerUserMenu from "../../components/BurgerMenu/BurgerUserMenu/BurgerUserMenu.jsx";
import BurgerAuthMenu from "../../components/BurgerMenu/BurgerAuthMenu/BurgerAuthMenu.jsx";

export default function Header() {
  const isLogIn = useSelector(selectIsLoggedIn);

  return (
    <header className={css.header}>
      <section className={css.sectionHeader}>
        <div className={css.headerContainer}>
          <Logo />
          <div className={css.divNavAndBurger}>
            <nav className={css.navigation}>
              <CreateLink className={css.reipeLink} text={"Recipes"} to={"/"} />
              <AppBar className={css.appbar} />
            </nav>
            {isLogIn ? <BurgerUserMenu /> : <BurgerAuthMenu />}
          </div>
        </div>
      </section>
    </header>
  );
}
