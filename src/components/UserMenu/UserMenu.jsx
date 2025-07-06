
import React, { useState } from "react";
import css from "./UserMenu.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import { LogOutIcon } from "../Icons/Icons";

import ModalWindow from "../ModalWindow/ModalWindow.jsx";

export default function UserMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const handleLogoutClick = () => {
  //   setIsLogoutModalOpen(true);
  // };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // const user = useSelector(selectUser);
  // const firstLetterName = function (name) {
  //   return String(name.split(" ")).split("")[0].split("")[0];
  // };

  const dispatch = useDispatch();
  const handleLogout = () => {
    setIsModalOpen(true);
    dispatch(logOut());
  };

// import { NavLink } from "react-router-dom";
// import css from "./UserMenu.module.css";

// import { selectUser } from "../../redux/auth/selectors";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../redux/auth/operations";

// export default function UserMenu() {
//   const dispatch = useDispatch();
//   const user = useSelector(selectUser);


//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   let userName = user.name;

//   const firstLetterName = function (name) {
//     return String(name.split(" ")).split("")[0].split("")[0];
//   };

  return (
    <div className={css.container}>
      <NavLink className={css.link} to="/api/user/current">
        My Profile
      </NavLink>
      <NavLink className={`${css.link} ${css.addButton}`} to="/api/add-recipe">
        Add Recipe
      </NavLink>

      <div className={css.firstLetter}>{firstLetterName(userName)}</div>
      <p className={css.userName}>{userName}</p>

      <button
        className={css.buttonUserMenu}
        aria-label="Log out"
        onClick={handleLogout}
      >
        <LogOutIcon />
      </button>
      {isModalOpen && (
        <ModalWindow
          type="logout"
          // type="unauthorised"
          // type="success"
          onClose={handleCloseModal}
          onConfirm={handleLogout}
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
}
