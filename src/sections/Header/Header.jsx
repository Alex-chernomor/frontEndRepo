import React from "react";
import Logo from "../../components/Logo/Logo.jsx";
import AppBar from "../../components/AppBar/AppBar.jsx";
import css from "./Header.module.css";
import CreateLink from "../../components/CreateLink/CreateLink.jsx";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import BurgerUserMenu from "../../components/BurgerMenu/BurgerUserMenu/BurgerUserMenu.jsx";
import BurgerAuthMenu from "../../components/BurgerMenu/BurgerAuthMenu/BurgerAuthMenu.jsx";

export default function Header() {
  const isLogIn = useSelector(selectIsLoggedIn);

  return (
    <header className={css.header}>
      <section className={css.sectionHeader}>
        <div className={css.headerContainer}>
          <Logo />
          <nav className={css.navigation}>
            <CreateLink className={css.reipeLink} text={"Recipes"} to={"/"} />
            <AppBar className={css.appbar} />
          </nav>
          {isLogIn ? <BurgerUserMenu /> : <BurgerAuthMenu />}
        </div>
      </section>
    </header>
  );
}
