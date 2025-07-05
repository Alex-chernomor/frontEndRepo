import React from "react";
import css from "./RecipeForm.module.css";

export default function RecipeTitleInput({ value, onChange }) {
  return (
    <div className={css.formGroup}>
      <label htmlFor="title" className={css.label}>
        Recipe Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        className={css.input}
        value={value}
        onChange={onChange}
        placeholder="Enter the name of your recipe"
        required
      />
    </div>
  );
}
