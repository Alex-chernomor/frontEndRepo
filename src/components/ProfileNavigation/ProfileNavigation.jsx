import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./ProfileNavigation.module.css";

function addClasses({ isActive }) {
  return clsx(css.itemLink, isActive && css.activeLink);
}

export const ProfileNavigation = () => {
  return (
    <ul>
      <li>
        <NavLink to="own" className={addClasses}>
          My Recipes
        </NavLink>
      </li>
      <li>
        <NavLink to="favorites" className={addClasses}>
          Saved Recipes
        </NavLink>
      </li>
    </ul>
  );
};
