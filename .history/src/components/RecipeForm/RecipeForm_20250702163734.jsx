.formWrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  width: 1440px; /* ✅ Фіксована ширина на десктоп */
  margin: 0 auto;
  padding: 2rem;
  background-color: #fafaf3;
  box-sizing: border-box;
}

.leftColumn,
.rightColumn {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input,
select,
textarea {
  width: 100%;
  padding: 0.6rem 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

label {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.error {
  color: red;
  font-size: 0.85rem;
}

.uploadImage {
  padding: 0.5rem;
  background: #fff;
  border: 2px dashed #ccc;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
}

.previewImage {
  width: 100%;
  max-width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

.ingredientRow {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.ingredientItem {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}

.ingredientList {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.deleteBtn {
  background: none;
  border: none;
  color: red;
  font-size: 1.2rem;
  cursor: pointer;
}

.submitBtn {
  grid-column: span 2;
  margin-top: 2rem;
  padding: 1rem;
  background-color: #a6733c;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

/* 📱 Mobile: до 767px */
@media (max-width: 767px) {
  .formWrapper {
    grid-template-columns: 1fr;
    width: 100%;
    padding: 1rem;
    gap: 1rem;
  }

  .submitBtn {
    grid-column: span 1;
    padding: 0.8rem;
    font-size: 1rem;
  }

  .ingredientRow {
    flex-direction: column;
  }

  .input,
  select,
  textarea {
    font-size: 0.95rem;
    padding: 0.5rem;
  }
}

/* 📱 Tablet: 768px — 1023px */
@media (min-width: 768px) and (max-width: 1023px) {
  .formWrapper {
    grid-template-columns: 1fr;
    width: 100%;
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .submitBtn {
    grid-column: span 1;
  }

  .ingredientRow {
    flex-direction: row;
  }
}

/* 🖥 Desktop: 1024px і більше */
@media (min-width: 1024px) {
  .formWrapper {
    grid-template-columns: 2fr 1fr;
    width: 1440px;
    padding: 2rem;
    gap: 2rem;
  }

  .submitBtn {
    grid-column: span 2;
  }
}

