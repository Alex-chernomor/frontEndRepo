import React from "react";
import css from "./UserMenu.module.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";

export default function UserMenu() {
  const user = useSelector(selectUser);
  const firstLetterName = function (name) {
    return String(name.split(" ")).split("")[0].split("")[0];
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <div className={css.container}>
      <NavLink className={css.link} to="/api/user/current">
        My Profile
      </NavLink>
      <NavLink className={`${css.link} ${css.addButton}`} to="/api/add-recipe">
        Add Recipe
      </NavLink>
      {/* <div className={css.firstLetter}>{firstLetterName(user.name)}</div> */}
      {/* <p className={css.userName}>{user.name}</p> */}
      <button
        className={css.buttonUserMenu}
        aria-label="Log out"
        onClick={handleLogout}
      >
        <svg
          width="24"
          height="28"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.07692 0.5H3.42308C1.80871 0.5 0.5 1.80871 0.5 3.42308V16.5769C0.5 18.1913 1.80871 19.5 3.42308 19.5H7.07692M5.5 10L20.1154 10M20.1154 10L15.7308 14.3846M20.1154 10L15.7308 5.61538"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
