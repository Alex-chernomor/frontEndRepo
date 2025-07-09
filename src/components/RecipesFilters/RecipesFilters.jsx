import { useSelector } from 'react-redux';
import Button from '../Button/Button.jsx';
import Select from 'react-select';
import css from './RecipesFilters.module.css';
// import { RecipeCount } from '../RecipeCount/RecipeCount.jsx';
import {
  // selectTotalCount,
  selectFilterCategories,
} from '../../redux/filters/selectors.js';
import { useIngredients } from '../../context/useIngredients.js';

const customStyles = {
  control: provided => ({
    ...provided,
    minHeight: '33px',
    height: '33px',
    minWidth: '179px',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    backgroundColor: 'inherit',
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

const RecipesFilters = ({
  categoryParam,
  ingredientIdParam,
  onChangeSearchParams,
  onResetFilters,
}) => {
  // const total = useSelector(selectTotalCount);
  const categories = useSelector(selectFilterCategories);
  const allIngredients = useIngredients();

  // <<<<<<< filter-dropdown
  const selectedCategory = categories.find(
    category => category._id === categoryParam
  );
  const selectedIngredient = allIngredients.find(
    ingredient => ingredient._id === ingredientIdParam
  );
  // =======
  const categoryOptions = categories.map(cat => ({
    label: cat.name,
    value: cat._id,
  }));
  // >>>>>>> main

  const ingredientOptions = allIngredients.map(ing => ({
    label: ing.name,
    value: ing._id,
  }));

  const hasSelectedFilters = selectedCategory || selectedIngredient;

  return (
    <div className={css.filtersWrap}>
      {/* <div className={css.countWrap}>
        <RecipeCount count={total} />
      </div> */}
      <div className={css.filtersBox}>
        <Button
          type="button"
          onClick={onResetFilters}
          className={`${css.btn} ${hasSelectedFilters ? css.active : ''}`}
        >
          Reset filters
        </Button>

        <Select
          options={categories.map(cat => ({
            label: cat.name,
            value: cat._id,
          }))}
          value={
            categoryOptions.find(
              category => category.label === categoryParam
            ) || null
          }
          onChange={option => {
            onChangeSearchParams('category', option?.label || '');
          }}
          placeholder="Category"
          isClearable
          styles={customStyles}
        />
        <Select
          options={allIngredients.map(ing => ({
            label: ing.name,
            value: ing._id,
          }))}
          value={
            ingredientOptions.find(ing => ing.value === ingredientIdParam) ||
            null
          }
          onChange={option =>
            onChangeSearchParams('ingredientId', option?.value || null)
          }
          placeholder={
            selectedIngredient ? selectedIngredient.name : 'Ingredient'
          }
          isClearable
          styles={customStyles}
        />
      </div>
    </div>
  );
};

export default RecipesFilters;
