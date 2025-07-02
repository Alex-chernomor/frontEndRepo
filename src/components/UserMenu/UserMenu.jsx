import css from "./UserMenu.module.css";
// import { selectUser } from "../../redux/auth/selectors";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../redux/auth/operations";
import { NavLink } from "react-router-dom";

export default function UserMenu() {
  let userName = "Max";
  const firstLetterName = function (name) {
    return name.split("")[0];
  };

  return (
    <div className={css.wrapper}>
      <NavLink className={css.link} to="/api/users/current">
        My Profile
      </NavLink>
      <NavLink className={css.link} to="/api/auth/add-recipe">
        Add Recipe
      </NavLink>
      <div className={css.avatarUserMenu}>{firstLetterName(userName)}</div>
      <p>{userName}</p>
      <button className={css.buttonUserMenu}>Log out</button>
    </div>
  );
}
