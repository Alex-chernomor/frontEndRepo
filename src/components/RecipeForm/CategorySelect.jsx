import React from "react";

export default function CategorySelect({ value, onChange }) {
  return (
    <label>
      Category
      <select name="category" value={value} onChange={onChange}>
        <option value="" disabled>
          Choose a category
        </option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="snack">Snack</option>
        <option value="dessert">Dessert</option>
        <option value="beverage">Beverage</option>
      </select>
    </label>
  );
}
