import React from "react";

export default function IngredientsList({ ingredients, onChange }) {
  return (
    <div>
      <label>Ingredients</label>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <input
              type="text"
              name={`ingredient-${index}`}
              value={ingredient}
              onChange={(e) => onChange(index, e.target.value)}
              placeholder="Enter ingredient"
            />
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => onChange(ingredients.length, "")}>
        + Add Ingredient
      </button>
    </div>
  );
}
