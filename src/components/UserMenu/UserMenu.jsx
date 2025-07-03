import React from "react";
import { NavLink } from "react-router-dom";
import css from "./UserMenu.module.css";

export default function UserMenu() {
  let userName = "Max";
  const firstLetterName = function (name) {
    return name.split("")[0];
  };

  return (
    <div className={css.container}>
      <NavLink className={css.link} to="/api/user/current">
        My Profile
      </NavLink>
      <NavLink className={`${css.link} ${css.addButton}`} to="/api/add-recipe">
        Add Recipe
      </NavLink>
      <div className={css.firstLetter}>{firstLetterName(userName)}</div>
      <p className={css.userName}>{userName}</p>
      <button className={css.buttonUserMenu}>Log out</button>
    </div>
  );
}
