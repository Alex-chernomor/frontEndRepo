import React from "react";
import { NavLink } from "react-router-dom";
import css from "./UserMenu.module.css";
export default function UserMenu() {
  return (
    <div>
      <NavLink className={css.userMenu}>My Profile</NavLink>
    </div>
  );
}
