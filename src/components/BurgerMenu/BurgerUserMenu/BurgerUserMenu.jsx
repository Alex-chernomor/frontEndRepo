import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "../BurgerUserMenu/BurgerUserMenu.module.css";
import { RxTextAlignJustify } from "react-icons/rx";
import { GoXCircle } from "react-icons/go";
import Logo from "../../Logo/Logo";

export default function BurgerUserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
                <li>
                  <NavLink to="/add-recipe" onClick={toggleMenu}>
                    Logout
                  </NavLink>
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
