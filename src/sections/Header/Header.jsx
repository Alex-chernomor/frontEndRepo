// Section header
// Use LogoComponent, Recipes link, User menu or AuthNav ( {isLoggedIn ? <UserMenu /> : <AuthNav />})
import Logo from '../../components/Logo/Logo.jsx';
import { Link, NavLink } from 'react-router';
import clsx from 'clsx';
import css from './Header.module.css';

const getLinkStyles = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Header() {
  return (
    <div>
      <ul>
        <li>
          <Logo />
        </li>
        <li>
          <NavLink to="/recipes" className={getLinkStyles}>
            Recipes
          </NavLink>
        </li>
        <li>
          <NavLink to="/user/profile" className={getLinkStyles}>
            My profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-recipe" className={getLinkStyles}>
            Add Recipe
          </NavLink>
        </li>
      </ul>
      {/* <img src="" alt="" /> */}
      <p>Name</p>
      <button>Logout</button>
    </div>
  );
}
