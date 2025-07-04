import React from "react";

export default function StepsInput({ value, onChange }) {
  return (
    <div>
      <label htmlFor="steps">Cooking Steps</label>
      <textarea
        id="steps"
        placeholder="Describe the steps of the recipe..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
      />
    </div>
  );
}
