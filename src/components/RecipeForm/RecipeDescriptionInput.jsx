import React from "react";

export default function RecipeDescriptionInput({ value, onChange }) {
  return (
    <label>
      Recipe Description
      <textarea
        name="description"
        placeholder="Enter a brief description of your recipe"
        value={value}
        onChange={onChange}
        rows={3}
      />
    </label>
  );
}
