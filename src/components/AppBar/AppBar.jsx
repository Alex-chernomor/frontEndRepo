import React from 'react';
// import { selectIsLoggedIn } from '../../redux/auth/selectors';
// import { useSelector } from 'react-redux';
import UserMenu from '../UserMenu/UserMenu';
import AuthNav from '../AuthNav/AuthNav';

export default function AppBar() {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header>
      AppBar
      {/* {isLoggedIn ? <UserMenu /> : <AuthNav />} */}
    </header>
  );
}
