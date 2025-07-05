import React from "react";

export default function ImageUpload({ image, onChange }) {
  return (
    <div>
      <label htmlFor="recipe-image">Recipe Image</label>
      <input
        type="file"
        id="recipe-image"
        accept="image/*"
        onChange={(e) => onChange(e.target.files[0])}
      />
      {image && <p>Selected file: {image.name}</p>}
    </div>
  );
}
