import React, { useState } from "react";
import { Field, Form, Formik, ErrorMessage, FieldArray } from "formik";
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

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
      }}
      onSubmit={(values) => {
        const dataToSubmit = {
          ...values,
          ingredients: values.ingredients.map((i) => ({ ...i })),
        };
        console.log(dataToSubmit);
        // onSubmit(dataToSubmit);
      }}
    >
      {(values, setFieldValue) => (
        <Form className={css.formWrapper}>
          <div className={css.leftColumn}>
            <h2>Add Recipe</h2>

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
                  <h3>Ingredients</h3>
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
                  </div>
                  <div className={css.ingredientList}>
                    {/* {values.ingredients.map((ing, index) => (
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
                    ))} */}
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
          </div>

          <div className={css.rightColumn}>
            <label>Upload Photo</label>
            <input
              name="photo"
              type="file"
              accept="image/*"
              className={css.uploadImage}
              onChange={(event) => {
                const file = event.currentTarget.files[0];
                setFieldValue("photo", file);
                setPreview(URL.createObjectURL(file));
              }}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className={styles.previewImage}
              />
            )}
          </div>

          <button type="submit" className={css.submitBtn}>
            Publish Recipe
          </button>
        </Form>
      )}
    </Formik>
  );
}
