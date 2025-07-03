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

// burder-menu-pages


import React from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu.jsx";

export default function AppBar() {
  return (
    <header>
      <BurgerMenu />
    </header>
  );
}


// burder-menu-pages