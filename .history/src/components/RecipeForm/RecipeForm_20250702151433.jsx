import React from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
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
  return (
    <Formik
      initialValues={{
        recipeName: "",
      }}
      onSubmit={() => {}}
    >
      <Form className={styles.formWrapper}>
        <div className={styles.leftColumn}>
          <h2>Add Recipe</h2>

          <div>
            <label htmlFor="title">Recipe Title</label>
            <Field
              name="title"
              placeholder="Enter the name of your recipe"
              className={styles.input}
            />
            <ErrorMessage
              name="title"
              component="div"
              className={styles.error}
            />
          </div>

          <div>
            <label htmlFor="description">Recipe Description</label>
            <Field
              name="description"
              as="textarea"
              placeholder="Enter a brief description"
              className={styles.input}
            />
            <ErrorMessage
              name="description"
              component="div"
              className={styles.error}
            />
          </div>

          <div>
            <label htmlFor="cookingTime">Cooking time in minutes</label>
            <Field name="cookingTime" type="number" className={styles.input} />
            <ErrorMessage
              name="cookingTime"
              component="div"
              className={styles.error}
            />
          </div>

          <div>
            <label htmlFor="calories">Calories</label>
            <Field name="calories" className={styles.input} />
            <ErrorMessage
              name="calories"
              component="div"
              className={styles.error}
            />
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <Field name="category" as="select" className={styles.input}>
              <option value="Soup">Soup</option>
              <option value="Main">Main</option>
              <option value="Dessert">Dessert</option>
            </Field>
            <ErrorMessage
              name="category"
              component="div"
              className={styles.error}
            />
          </div>

          <FieldArray name="ingredients">
            {({ push, remove }) => (
              <div>
                <h3>Ingredients</h3>
                <div className={styles.ingredientRow}>
                  <Field
                    name="ingredientName"
                    placeholder="Name"
                    className={styles.input}
                  />
                  <Field
                    name="ingredientAmount"
                    placeholder="Amount"
                    className={styles.input}
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
                <div className={styles.ingredientList}>
                  {values.ingredients.map((ing, index) => (
                    <div key={index} className={styles.ingredientItem}>
                      {ing.name} — {ing.amount}
                      <button
                        type="button"
                        className={styles.deleteBtn}
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
              className={styles.input}
            />
            <ErrorMessage
              name="instructions"
              component="div"
              className={styles.error}
            />
          </div>
        </div>

        <div className={styles.rightColumn}>
          <label>Upload Photo</label>
          <input
            name="photo"
            type="file"
            accept="image/*"
            className={styles.uploadImage}
            onChange={(event) => {
              const file = event.currentTarget.files[0];
              setFieldValue("photo", file);
              setPreview(URL.createObjectURL(file));
            }}
          />
          {preview && (
            <img src={preview} alt="Preview" className={styles.previewImage} />
          )}
        </div>

        <button type="submit" className={styles.submitBtn}>
          Publish Recipe
        </button>
      </Form>
    </Formik>
  );
}
