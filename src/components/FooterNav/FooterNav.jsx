import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import CreateLink from "../CreateLink/CreateLink.jsx";
import css from "./FooterNav.module.css";

export default function FooterNav() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const accountRoute = isLoggedIn ? "/user/profile" : "/auth/login";

  return (
    <nav className={css.footerNav}>
      <CreateLink text="Recipes" to="/" className={css.link} />
      <CreateLink text="Account" to={accountRoute} className={css.link} />
    </nav>
  );
}
