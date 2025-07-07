import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";

import {
  selectFilterCategories,
  selectTotalCount,
} from "../../redux/filters/selectors.js";
import { useIngredients } from "../../context/useIngredients.js";
import { RecipeCount } from "../RecipeCount/RecipeCount.jsx";
import RecipesFilters from "../RecipesFilters/RecipesFilters.jsx";
import css from "./FilterMenu.module.css";

export default function FilterMenu({
  categoryParam,
  ingredientIdParam,
  onChangeSearchParams,
  onResetFilters,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = useSelector(selectFilterCategories);
  const totalCount = useSelector(selectTotalCount);
  const allIngredients = useIngredients();

  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat._id,
  }));
  const selectedCategory =
    categoryOptions.find((cat) => cat.label === categoryParam) || null;

  const ingredientOptions = allIngredients.map((ing) => ({
    label: ing.name,
    value: ing._id,
  }));
  const selectedIngredient =
    ingredientOptions.find((ing) => ing.value === ingredientIdParam) || null;

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "33px",
      height: "33px",
      minWidth: "179px",
      border: "1px solid #d9d9d9",
      borderRadius: "4px",
      backgroundColor: "inherit",
    }),
    valueContainer: (provided) => ({ ...provided, padding: "0 8px" }),
    input: (provided) => ({ ...provided, margin: 0, padding: 0 }),
    indicatorsContainer: (provided) => ({ ...provided, height: "33px" }),
    singleValue: (provided) => ({ ...provided, color: "#595d62" }),
    indicatorSeparator: () => ({ display: "none" }),
    menuPortal: (provided) => ({ ...provided, zIndex: 1001 }),
  };

  // Блокуємо скрол сторінки, поки модалка відкрита
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      {/* Верхній рядок для мобілки/планшету */}
      <div className={css.topRow}>
        <div className={css.countWrap}>
          <RecipeCount count={totalCount} />
        </div>
        <button className={css.openBtn} onClick={openModal}>
          <span>Filters</span>
          <svg
            className={css.icon}
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.68117 1.125L13.3188 1.12501C14.1092 1.12501 14.75 1.76576 14.75 2.55617C14.75 2.92149 14.6103 3.27298 14.3595 3.53863L9.55769 8.625L9.55769 12.1462C9.55769 13.294 8.35844 14.0476 7.32425 13.5496C6.7851 13.29 6.44231 12.7445 6.44231 12.1462L6.44231 8.625L1.64049 3.53863C1.3897 3.27298 1.25 2.92149 1.25 2.55617C1.25 1.76576 1.89076 1.125 2.68117 1.125Z"
              stroke="black"
            />
          </svg>
        </button>
      </div>

      {/* Десктопні фільтри */}
      <div className={css.desktopFilters}>
        <RecipesFilters
          categoryParam={categoryParam}
          ingredientIdParam={ingredientIdParam}
          onChangeSearchParams={onChangeSearchParams}
          onResetFilters={onResetFilters}
        />
      </div>

      {/* Модалка */}
      {isOpen && (
        <div className={css.backdrop} onClick={closeModal}>
          <div className={css.modal} onClick={(e) => e.stopPropagation()}>
            <div className={css.header}>
              <h2 className={css.title}>Filters</h2>
              <button className={css.closeBtn} onClick={closeModal}>
                ✕
              </button>
            </div>

            <Select
              options={categoryOptions}
              value={selectedCategory}
              onChange={(opt) =>
                onChangeSearchParams("category", opt?.label || "")
              }
              placeholder="Category"
              isClearable
              styles={customStyles}
              menuPortalTarget={document.body}
              menuPosition="fixed"
            />

            <Select
              options={ingredientOptions}
              value={selectedIngredient}
              onChange={(opt) =>
                onChangeSearchParams("ingredientId", opt?.value || null)
              }
              placeholder="Ingredient"
              isClearable
              styles={customStyles}
              menuPortalTarget={document.body}
              menuPosition="fixed"
            />

            <button
              type="button"
              className={css.resetBtn}
              onClick={() => {
                onResetFilters();
                closeModal();
              }}
            >
              Reset filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
