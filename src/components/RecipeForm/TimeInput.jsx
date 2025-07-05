import React from "react";

export default function TimeInput({ value, onChange }) {
  return (
    <label>
      Cooking Time
      <input
        type="number"
        name="time"
        value={value}
        onChange={onChange}
        placeholder="10"
        min="1"
      />
    </label>
  );
}
