import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../BurgerUserMenu/BurgerUserMenu.module.css";
import { RxTextAlignJustify } from "react-icons/rx";
import { GoXCircle } from "react-icons/go";
import Logo from "../../Logo/Logo";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/selectors";
import toast from "react-hot-toast";
import { logOut } from "../../../redux/auth/operations";
import { LogOutIcon } from "../../Icons/Icons";
import ModalWindow from "../../ModalWindow/ModalWindow.jsx";

export default function BurgerUserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const userName = user?.name || "User";
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 768;
      setIsMobile(isNowMobile);

      if (!isNowMobile && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  const firstLetterName = (name) => name?.trim()?.charAt(0).toUpperCase() || "";
  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogoutConfirm = async () => {
    try {
      await dispatch(logOut()).unwrap();
      navigate("/");
    } catch (error) {
      console.error(error.message);
      toast.error(error?.message || "Logout failed");
    }
  };
  return (
    <>
      {isMobile && !isOpen && (
        <button className={styles.burgerBtn} onClick={toggleMenu}>
          <RxTextAlignJustify className={styles.icon} size={32} />
        </button>
      )}
      {isMobile && isOpen && (
        <div className={styles.backdrop}>
          <div className={styles.backdropInner}>
            <div className={styles.topBar}>
              <Logo />
              <button className={styles.burgerBtn} onClick={toggleMenu}>
                <GoXCircle className={styles.icon} size={32} />
              </button>
            </div>

            <nav className={styles.menu}>
              <ul>
                <li>
                  <NavLink to="/recipes" onClick={toggleMenu}>
                    Recipes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/user/profile" onClick={toggleMenu}>
                    My profile
                  </NavLink>
                </li>
                <li className={styles.liUserLogout}>
                  <div className={styles.iconUserDiv}>
                    <div className={styles.firstLetter}>
                      {firstLetterName(userName)}
                    </div>
                  </div>

                  <p className={styles.userName}>{userName}</p>

                  <button
                    className={styles.buttonUserMenu}
                    aria-label="Log out"
                    onClick={handleLogoutClick}
                  >
                    <LogOutIcon />
                  </button>
                  {isModalOpen && (
                    <ModalWindow
                      type="logout"
                      onClose={handleCloseModal}
                      onConfirm={handleLogoutConfirm}
                      onCancel={handleCloseModal}
                    />
                  )}
                </li>
                <li className={styles.liButton}>
                  <button className={styles.button} onClick={toggleMenu}>
                    Add Recepy
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
