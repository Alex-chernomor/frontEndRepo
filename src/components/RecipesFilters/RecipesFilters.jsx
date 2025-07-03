// import { useState } from 'react';
// import Select from 'react-select';
// import css from './RecipesFilters.module.css';

// const customStyles = {
//   control: provided => ({
//     ...provided,
//     minHeight: '33px',
//     height: '33px',
//     minWidth: '179px',
//     border: '1px solid #d9d9d9',
//     borderRadius: '4px',
//   }),
//   valueContainer: provided => ({
//     ...provided,
//     padding: '0 8px',
//   }),
//   input: provided => ({
//     ...provided,
//     margin: 0,
//     padding: 0,
//   }),
//   indicatorsContainer: provided => ({
//     ...provided,
//     height: '33px',
//   }),
//   singleValue: provided => ({
//     ...provided,
//     color: '#595d62',
//   }),
//   indicatorSeparator: () => ({
//     display: 'none',
//   }),
// };

// const RecipesFilters = () => {
//   const categories = ['Lunch', 'Dinner'];
//   const ingredients = ['Eggs', 'Tomatoes'];

//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedIngredient, setSelectedIngredient] = useState(null);

//   const handleReset = () => {
//     setSelectedCategory(null);
//     setSelectedIngredient(null);
//   };

//   const hasSelectedFilters = selectedCategory || selectedIngredient;

//   return (
//     <div className={css.filtersWrapper}>
//       <div className={css.filtersBox}>
//         <button
//           onClick={handleReset}
//           className={`${css.button} ${hasSelectedFilters ? css.active : ''}`}
//         >
//           Reset filters
//         </button>
//         <Select
//           options={categories.map(cat => ({ label: cat, value: cat }))}
//           value={selectedCategory}
//           onChange={setSelectedCategory}
//           placeholder="Category"
//           isClearable
//           className={css.select}
//           styles={customStyles}
//         />
//         <Select
//           options={ingredients.map(ing => ({ label: ing, value: ing }))}
//           value={selectedIngredient}
//           onChange={setSelectedIngredient}
//           placeholder="Ingredient"
//           isClearable
//           className={css.select}
//           styles={customStyles}
//         />
//       </div>
//     </div>
//   );
// };

// export default RecipesFilters;

import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRecipesByFilters,
  fetchFilterOptions,
  resetFilters,
} from '../redux/recipes/operations';
import {
  selectFilteredRecipes,
  selectFilterOptions,
  selectIsLoading,
} from '../redux/recipes/selectors';
import css from './RecipesFilters.module.css';

const customStyles = {
  control: provided => ({
    ...provided,
    minHeight: '33px',
    height: '33px',
    width: '179px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: 'none',
  }),
  valueContainer: provided => ({
    ...provided,
    height: '33px',
    padding: '0 8px',
    display: 'flex',
    alignItems: 'center',
  }),
  input: provided => ({
    ...provided,
    margin: 0,
    padding: 0,
  }),
  indicatorsContainer: provided => ({
    ...provided,
    height: '33px',
  }),
  singleValue: provided => ({
    ...provided,
    color: '#595d62',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};

const RecipesFilters = () => {
  const dispatch = useDispatch();

  const { ingredients, categories } = useSelector(selectFilterOptions);
  const recipes = useSelector(selectFilteredRecipes);
  const isLoading = useSelector(selectIsLoading);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const hasSelectedFilters = selectedCategory || selectedIngredient;

  useEffect(() => {
    dispatch(fetchFilterOptions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchRecipesByFilters({
        category: selectedCategory?.value || '',
        ingredient: selectedIngredient?.value || '',
      })
    );
  }, [selectedCategory, selectedIngredient, dispatch]);

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedIngredient(null);
    dispatch(resetFilters());
    dispatch(fetchRecipesByFilters({ category: '', ingredient: '' }));
  };

  return (
    <div>
      <div className={css.filtersWrapper}>
        <div className={css.filtersBox}>
          <button
            onClick={handleReset}
            className={`${css.btn} ${hasSelectedFilters ? css.active : ''}`}
          >
            Reset filters
          </button>
          <Select
            options={categories.map(cat => ({ label: cat, value: cat }))}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="Category"
            isClearable
            styles={customStyles}
          />
          <Select
            options={ingredients.map(ing => ({ label: ing, value: ing }))}
            value={selectedIngredient}
            onChange={setSelectedIngredient}
            placeholder="Ingredient"
            isClearable
            styles={customStyles}
          />
        </div>
      </div>

      {isLoading ? (
        <p>Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p className={css.text}>No recipes match your filters.</p>
      ) : (
        <p className={css.text}>{recipes.length} recipes found.</p>
      )}
    </div>
  );
};

export default RecipesFilters;
