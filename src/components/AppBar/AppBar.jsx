import React from "react";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";

export default function AppBar({ className }) {
  const isLoggedIn = false;

  return (
    <div className={className}>{isLoggedIn ? <UserMenu /> : <AuthNav />}</div>
  );
}
