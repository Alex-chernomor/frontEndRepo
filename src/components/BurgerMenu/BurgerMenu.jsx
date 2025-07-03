import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "../BurgerMenu/BurgerMenu.module.css";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile && (
        <button className={styles.burgerBtn} onClick={toggleMenu}>
          ☰
        </button>
      )}

      {isMobile && isOpen && (
        <nav>
          <ul className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
            <li>
              <NavLink to="/recipes">Recipes</NavLink>
            </li>
            <li>
              <NavLink to="/user/profile">My profile</NavLink>
            </li>
            <li>
              <NavLink to="/add-recipe">Add recipe</NavLink>
            </li>
            <li>
              <button>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
