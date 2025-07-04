import React, { useState, useRef } from "react";
import {
  Field,
  Form,
  Formik,
  ErrorMessage,
  FieldArray,
  useFormik,
} from "formik";
import css from "./RecipeForm.module.css";
import * as Yup from "yup";

const RecipeSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  cookingTime: Yup.number().positive("Must be positive").required("Required"),
  calories: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  ingredients: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Required"),
      amount: Yup.string().required("Required"),
    })
  ),
  instructions: Yup.string().required("Required"),
  photo: Yup.mixed().nullable(),
});

export default function RecipeForm({ onAdd }) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    onSubmit: (values) => {
      console.log("Submitted file:", values.file);
      // Handle file upload here
    },
  });

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      formik.setFieldValue("file", file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("file", file);
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        cookingTime: "",
        calories: "",
        category: "",
        ingredients: [],
        instructions: "",
        photo: null,
        ingredientName: "",
        ingredientAmount: "",
      }}
      validationSchema={RecipeSchema}
      onSubmit={(values) => {
        const dataToSubmit = {
          ...values,
          ingredients: values.ingredients.map((i) => ({ ...i })),
        };
        console.log(dataToSubmit);
        // onAdd(dataToSubmit); // если нужен вызов callback
      }}
    >
      {({ values, setFieldValue }) => (
        <div className={css.formWrapper}>
          <h2 className={css.sectionTitle}>Add Recipe</h2>
          <Form>
            <p className={css.uploadPhoto}>Upload Photo</p>
            <div
              className={css.photoContainer}
              onClick={handleClick}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                name="photo"
                type="file"
                accept="image/*"
                className={css.uploadImage}
                ref={fileInputRef}
                onChange={handleFileChange}
                hidden
              />
              {preview && (
                <img src={preview} alt="Preview" className={css.previewImage} />
              )}
            </div>

            <p className={css.generalInfo}>General Information</p>

            <div>
              <label htmlFor="title">Recipe Title</label>
              <Field
                name="title"
                placeholder="Enter the name of your recipe"
                className={css.input}
              />
              <ErrorMessage
                name="title"
                component="div"
                className={css.error}
              />
            </div>

            <div>
              <label htmlFor="description">Recipe Description</label>
              <Field
                name="description"
                as="textarea"
                placeholder="Enter a brief description"
                className={css.input}
              />
              <ErrorMessage
                name="description"
                component="div"
                className={css.error}
              />
            </div>

            <div>
              <label htmlFor="cookingTime">Cooking time in minutes</label>
              <Field name="cookingTime" type="number" className={css.input} />
              <ErrorMessage
                name="cookingTime"
                component="div"
                className={css.error}
              />
            </div>

            <div>
              <label htmlFor="calories">Calories</label>
              <Field name="calories" className={css.input} />
              <ErrorMessage
                name="calories"
                component="div"
                className={css.error}
              />
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <Field name="category" as="select" className={css.input}>
                <option value="">Select category</option>
                <option value="Soup">Soup</option>
                <option value="Main">Main</option>
                <option value="Dessert">Dessert</option>
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className={css.error}
              />
            </div>

            <FieldArray name="ingredients">
              {({ push, remove }) => (
                <div>
                  <p className={css.ingredientsTitle}>Ingredients</p>
                  <div className={css.ingredientRow}>
                    <Field
                      name="ingredientName"
                      placeholder="Name"
                      className={css.input}
                    />
                    <Field
                      name="ingredientAmount"
                      placeholder="Amount"
                      className={css.input}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (values.ingredientName && values.ingredientAmount) {
                        push({
                          name: values.ingredientName,
                          amount: values.ingredientAmount,
                        });
                        setFieldValue("ingredientName", "");
                        setFieldValue("ingredientAmount", "");
                      }
                    }}
                  >
                    Add new ingredient
                  </button>

                  <div className={css.ingredientList}>
                    {values.ingredients.map((ing, index) => (
                      <div key={index} className={css.ingredientItem}>
                        {ing.name} — {ing.amount}
                        <button
                          type="button"
                          className={css.deleteBtn}
                          onClick={() => remove(index)}
                        >
                          🗑
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </FieldArray>

            <div>
              <label htmlFor="instructions">Instructions</label>
              <Field
                name="instructions"
                as="textarea"
                placeholder="Enter instructions"
                className={css.input}
              />
              <ErrorMessage
                name="instructions"
                component="div"
                className={css.error}
              />
            </div>

            <button type="submit" className={css.submitBtn}>
              Publish Recipe
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}
