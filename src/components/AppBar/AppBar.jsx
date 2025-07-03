import React from 'react';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import UserMenu from '../UserMenu/UserMenu';
import AuthNav from '../AuthNav/AuthNav';

export default function AppBar({ className }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header className={className}>
      <BurgerMenu />
      <div>{isLoggedIn ? <UserMenu /> : <AuthNav />}</div>
    </header>
  );
}
