import { useState } from 'react';
import css from './UserMenu.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';
import { LogOutIcon } from '../Icons/Icons';

import ModalWindow from '../ModalWindow/ModalWindow.jsx';
import toast from 'react-hot-toast';

export default function UserMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const userName = user?.name || 'userName';

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogoutConfirm = async () => {
    try {
      await dispatch(logOut()).unwrap();
      navigate('/');
    } catch (error) {
      console.error(error.message);
      toast.error(error?.message || 'Logout failed');
    }
  };

  //! charAt(0) повертає першу літеру рядка
  const firstLetterName = name => name?.trim()?.charAt(0).toUpperCase() || '';
  return (
    <div className={css.container}>
      <NavLink className={css.link} to="/api/users/current">
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
        onClick={handleLogoutClick}
      >
        <LogOutIcon />
      </button>
      {isModalOpen && (
        <ModalWindow
          type="logout"
          // type="unauthorised"
          // type="success"
          onClose={handleCloseModal}
          onConfirm={handleLogoutConfirm}
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
}
