import React from "react";
import { NavLink } from "react-router-dom";

export default function RecipesLink({ className, text, to }) {
  return (
    <NavLink to={to} className={className}>
      {text}
    </NavLink>
  );
}
