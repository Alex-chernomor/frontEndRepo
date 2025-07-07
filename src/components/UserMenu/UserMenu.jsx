import { useState } from "react";
import css from "./UserMenu.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserName } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import { LogOutIcon } from "../Icons/Icons";

import ModalWindow from "../ModalWindow/ModalWindow.jsx";

export default function UserMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const name = useSelector(selectUserName);

  const userName = name || "User";

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setIsModalOpen(true);
    dispatch(logOut());
  };

  //! charAt(0) повертає першу літеру рядка
  const firstLetterName = (name) => name?.trim()?.charAt(0).toUpperCase() || "";

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
