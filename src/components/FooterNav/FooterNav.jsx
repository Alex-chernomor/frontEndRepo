import { NavLink, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import css from "./FooterNav.module.css";

export default function FooterNav() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigation();

  const handleAccountClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate("/user/profile");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <nav className={css.footerNav}>
      <NavLink className={css.link} to="/">
        Recipes
      </NavLink>
      <a href="/account" className={css.link} onClick={handleAccountClick}>
        Account
      </a>
    </nav>
  );
}
