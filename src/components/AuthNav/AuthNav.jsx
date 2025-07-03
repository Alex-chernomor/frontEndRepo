import React from "react";
import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";
// Register and Log in

export default function AuthNav() {
  return (
    <div>
      <nav>
        <NavLink to="/api/auth/login" className={css.link}>
          Log in
        </NavLink>
        <NavLink
          to="/api/auth/register"
          className={`${css.link} ${css.registerButton}`}
        >
          Register
        </NavLink>
      </nav>
    </div>
  );
}
