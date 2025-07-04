import React from "react";
import { NavLink } from "react-router-dom";

export default function CreateLink({ className, text, to }) {
  return (
    <NavLink to={to} className={className}>
      {text}
    </NavLink>
  );
}
