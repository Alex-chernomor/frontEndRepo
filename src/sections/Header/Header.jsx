import React from "react";
import Logo from "../../components/Logo/Logo.jsx";
import AppBar from "../../components/AppBar/AppBar.jsx";
import css from "./Header.module.css";
import CreateLink from "../../components/CreateLink/CreateLink.jsx";
import { RxTextAlignJustify } from "react-icons/rx";

export default function Header() {
  return (
    <header className={css.header}>
      <section className={css.sectionHeader}>
        <div className={css.headerContainer}>
          <Logo />
          <nav className={css.navigation}>
            <CreateLink className={css.reipeLink} text={"Recipes"} to={"/"} />
            <AppBar className={css.appbar} />
          </nav>
          <button className={css.containerIcon}>
            <RxTextAlignJustify className={css.icon} size={32} />
          </button>
        </div>
      </section>
    </header>
  );
}
