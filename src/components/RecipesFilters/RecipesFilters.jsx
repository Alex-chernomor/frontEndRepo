import { useState } from 'react';
import Button from '../Button/Button.jsx';
import Select from 'react-select';

import css from './RecipesFilters.module.css';
import { RecipeCount } from '../RecipeCount/RecipeCount.jsx';

const customStyles = {
  control: provided => ({
    ...provided,
    minHeight: '33px',
    height: '33px',
    minWidth: '179px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
  }),
  valueContainer: provided => ({
    ...provided,
    padding: '0 8px',
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
  const categories = ['Lunch', 'Dinner'];
  const ingredients = ['Eggs', 'Tomatoes'];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedIngredient(null);
  };

  const hasSelectedFilters = selectedCategory || selectedIngredient;

  return (
    <div className={css.filtersWrap}>
      <div className={css.countWrap}>
        <RecipeCount className={css.count} />
      </div>
      <div className={css.filtersBox}>
        <Button
          type="button"
          onClick={handleReset}
          className={`${css.btn} ${hasSelectedFilters ? css.active : ''}`}
        >
          Reset filters
        </Button>
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
  );
};

export default RecipesFilters;
