import { useState, useRef, useEffect } from "react";
import { FilterIcon, CloseIcon } from "../Icons/Icons.jsx";
import css from "./MobileFiltersDropdown.module.css";
import { useSelector } from "react-redux";
import {
  selectFilterCategories,
  // selectTotalCount,
} from "../../redux/filters/selectors.js";
import { useIngredients } from "../../context/useIngredients.js";
import Select from "react-select";
import Button from "../Button/Button.jsx";

const MobileFiltersDropdown = (props) => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  const toggle = () => setOpen((p) => !p);

  // закриття по кліку поза панеллю
  useEffect(() => {
    const handleClick = (e) => {
      if (open && panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 8px",
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "33px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#595d62",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  const RecipesFiltersList = ({
    categoryParam,
    ingredientIdParam,
    onChangeSearchParams,
    onResetFilters,
  }) => {
    // const total = useSelector(selectTotalCount);
    const categories = useSelector(selectFilterCategories);
    const allIngredients = useIngredients();

    const selectedCategory = categories.find(
      (category) => category._id === categoryParam
    );
    const selectedIngredient = allIngredients.find(
      (ingredient) => ingredient._id === ingredientIdParam
    );

    const ingredientOptions = allIngredients.map((ing) => ({
      label: ing.name,
      value: ing._id,
    }));
    const categoryOptions = categories.map((cat) => ({
      label: cat.name,
      value: cat._id,
    }));

    const hasSelectedFilters = selectedCategory || selectedIngredient;

    return (
      <div className={css.filtersBox}>
        <Select
          options={categories.map((cat) => ({
            label: cat.name,
            value: cat._id,
          }))}
          value={
            categoryOptions.find(
              (category) => category.label === categoryParam
            ) || null
          }
          onChange={(option) => {
            onChangeSearchParams("category", option?.label || "");
            setOpen(false);
          }}
          placeholder="Category"
          // isClearable
          styles={customStyles}
        />
        <Select
          options={allIngredients.map((ing) => ({
            label: ing.name,
            value: ing._id,
          }))}
          value={
            ingredientOptions.find((ing) => ing.value === ingredientIdParam) ||
            null
          }
          onChange={(option) =>
            onChangeSearchParams("ingredientId", option?.value || null)
          }
          placeholder={
            selectedIngredient ? selectedIngredient.name : "Ingredient"
          }
          // isClearable
          styles={customStyles}
        />
        <Button
          type="button"
          onClick={onResetFilters}
          className={`${css.btn} ${hasSelectedFilters ? css.active : ""}`}
        >
          Reset filters
        </Button>
      </div>
    );
  };

  return (
    <div className={css.container}>
      <button className={css.toggleBtn} onClick={toggle}>
        <span className={css.label}>Filters</span>
        <FilterIcon className={css.icon} />
      </button>

      {/* бекдроп, щоб затемнювати іншу частину екрана */}
      <div className={`${css.backdrop} ${open ? css.show : ""}`} />

      {/* панель‑дропдауни під іконкою */}
      <div ref={panelRef} className={`${css.panel} ${open ? css.open : ""}`}>
        <header className={css.panelHeader}>
          <span>Filters</span>
          <button className={css.closeBtn} onClick={() => setOpen(false)}>
            <CloseIcon />
          </button>
        </header>

        <RecipesFiltersList {...props} />
      </div>
    </div>
  );
};

export default MobileFiltersDropdown;
