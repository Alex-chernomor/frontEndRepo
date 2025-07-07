import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import Button from "../Button/Button.jsx";
import css from "./RecipesFilters.module.css";
import { RecipeCount } from "../RecipeCount/RecipeCount.jsx";

import {
  selectTotalCount,
  selectFilterCategories,
  selectFilterIngredients,
  selectSelectedCategory,
  selectSelectedIngredient,
} from "../../redux/filters/selectors.js";

import {
  setSelectedCategory,
  setSelectedIngredient,
  resetFilters,
} from "../../redux/filters/slice.js";

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

const RecipesFilters = () => {
  const dispatch = useDispatch();

  const total = useSelector(selectTotalCount);
  const categories = useSelector(selectFilterCategories);
  const ingredients = useSelector(selectFilterIngredients);
  const selectedCategory = useSelector(selectSelectedCategory);
  const selectedIngredient = useSelector(selectSelectedIngredient);

  const categoryOptions = categories.map((cat) => ({
    label: cat.name,
    value: cat._id,
  }));
  const ingredientOptions = ingredients.map((ing) => ({
    label: ing.name,
    value: ing._id,
  }));

  const currentCategory =
    categoryOptions.find((opt) => opt.value === selectedCategory) || null;

  const currentIngredient =
    ingredientOptions.find((opt) => opt.value === selectedIngredient) || null;

  const hasSelectedFilters = Boolean(selectedCategory || selectedIngredient);

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className={css.filtersWrap}>
      <div className={css.countWrap}>
        <RecipeCount count={total} />
      </div>

      <div className={css.filtersBox}>
        <Button
          type="button"
          onClick={handleReset}
          className={`${css.btn} ${hasSelectedFilters ? css.active : ""}`}
        >
          Reset filters
        </Button>

        <Select
          options={categoryOptions}
          value={currentCategory}
          onChange={(option) =>
            dispatch(setSelectedCategory(option?.value || null))
          }
          placeholder="Category"
          isClearable
          styles={customStyles}
        />

        <Select
          options={ingredientOptions}
          value={currentIngredient}
          onChange={(option) =>
            dispatch(setSelectedIngredient(option?.value || null))
          }
          placeholder="Ingredient"
          isClearable
          styles={customStyles}
        />
      </div>
    </div>
  );
};

export default RecipesFilters;
