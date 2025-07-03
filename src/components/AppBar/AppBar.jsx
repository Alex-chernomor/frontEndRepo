import React from "react";
// import { selectIsLoggedIn } from '../../redux/auth/selectors';
// import { useSelector } from 'react-redux';
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";

export default function AppBar({ className }) {
  const isLoggedIn = true;

  return (
    <div className={className}>{isLoggedIn ? <UserMenu /> : <AuthNav />}</div>
  );
}
