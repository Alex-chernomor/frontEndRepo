// DropzoneField.js
import React, { useRef, useState } from "react";

const DropzoneField = ({ field, form }) => {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      form.setFieldValue(field.name, file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      form.setFieldValue(field.name, file);
    }
  };

  return (
    <div
      className={`drop-zone ${dragActive ? "dragover" : ""}`}
      onClick={handleClick}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <p>
        Drag & drop your file here or <span className="browse">browse</span>
      </p>
      <input type="file" ref={inputRef} onChange={handleChange} hidden />
      {field.value && (
        <div className="file-name">Selected: {field.value.name}</div>
      )}
    </div>
  );
};

export default DropzoneField;
