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
              <svg
                width="82"
                height="82"
                viewBox="0 0 82 82"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50.363 44.7452C50.363 49.9162 46.171 54.1082 41 54.1082C35.829 54.1082 31.637 49.9162 31.637 44.7452C31.637 39.5741 35.829 35.3822 41 35.3822C46.171 35.3822 50.363 39.5741 50.363 44.7452Z"
                  stroke="#070707"
                  stroke-width="2.5625"
                />
                <path
                  d="M16.6563 57.6562L16.6563 34.8358C16.6563 31.0007 19.7652 27.8918 23.6002 27.8918C26.2304 27.8918 28.6348 26.4058 29.8111 24.0533L31.3848 20.9058C32.687 18.3014 35.3489 16.6562 38.2608 16.6563L43.7393 16.6563C46.6511 16.6563 49.313 18.3014 50.6152 20.9058L52.1889 24.0533C53.3652 26.4058 55.7696 27.8919 58.3998 27.8919C62.2348 27.8919 65.3438 31.0008 65.3438 34.8358V57.6562C65.3438 61.9019 61.9019 65.3437 57.6563 65.3437H24.3437C20.0981 65.3437 16.6562 61.9019 16.6563 57.6562Z"
                  stroke="#070707"
                  stroke-width="2.5625"
                />
              </svg>
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
