import React, { useState } from "react";
import RecipeTitleInput from "./RecipeTitleInput";
import RecipeDescriptionInput from "./RecipeDescriptionInput";
import CategorySelect from "./CategorySelect";
import TimeInput from "./TimeInput";
import IngredientsList from "./IngredientsList";
import ImageUpload from "./ImageUpload";
import SubmitButton from "./SubmitButton";
import DoneMessage from "../DoneMessage/DoneMessage";

export default function RecipeForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);
  const [image, setImage] = useState(null);

  const handleIngredientsChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📨 Form submitted", {
      title,
      description,
      category,
      time,
      ingredients,
      image,
    });
    setIsSubmitted(true);
  };

  if (isSubmitted) return <DoneMessage />;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Recipe</h2>

      <h3>General Information</h3>

      <RecipeTitleInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <RecipeDescriptionInput
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div>
        <label>Cooking time in minutes</label>
        <TimeInput value={time} onChange={(e) => setTime(e.target.value)} />
      </div>

      <div>
        <label>Category</label>
        <CategorySelect
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <h3>Ingredients</h3>
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Ingredient name"
            value={ingredient.name}
            onChange={(e) =>
              handleIngredientsChange(index, "name", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Amount"
            value={ingredient.amount}
            onChange={(e) =>
              handleIngredientsChange(index, "amount", e.target.value)
            }
          />
        </div>
      ))}

      <button type="button" onClick={handleAddIngredient}>
        Add new ingredient
      </button>

      <h3>Upload Photo</h3>
      <ImageUpload image={image} onChange={setImage} />

      <h3>Instructions</h3>
      {/* Поле без назви "Cooking Steps" */}
      <textarea placeholder="Enter instructions..." onChange={() => {}} />

      <SubmitButton />
    </form>
  );
}
