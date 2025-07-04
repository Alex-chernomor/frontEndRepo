import React from "react";
import { Field, Form, Formik } from "formik";
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
      <Form className="recipe-form">
        <h2>Add Recipe</h2>

        <div>
          <label>Recipe Title</label>
          <Field name="title" placeholder="Enter the name of your recipe" />
          <ErrorMessage name="title" component="div" />
        </div>

        <div>
          <label>Recipe Description</label>
          <Field
            name="description"
            as="textarea"
            placeholder="Enter a brief description"
          />
          <ErrorMessage name="description" component="div" />
        </div>

        <div>
          <label>Cooking time in minutes</label>
          <Field name="cookingTime" type="number" />
          <ErrorMessage name="cookingTime" component="div" />
        </div>

        <div>
          <label>Calories</label>
          <Field name="calories" />
          <ErrorMessage name="calories" component="div" />
        </div>

        <div>
          <label>Category</label>
          <Field name="category" as="select">
            <option value="Soup">Soup</option>
            <option value="Main">Main</option>
            <option value="Dessert">Dessert</option>
          </Field>
        </div>

        {/* Upload Photo */}
        <div>
          <label>Upload Photo</label>
          <input
            name="photo"
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.currentTarget.files[0];
              setFieldValue("photo", file);
              setPreview(URL.createObjectURL(file));
            }}
          />
          {preview && <img src={preview} alt="Preview" width={200} />}
        </div>

        {/* Ingredients */}
        <FieldArray name="ingredients">
          {({ push, remove }) => (
            <div>
              <h3>Ingredients</h3>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Field name="ingredientName" placeholder="Name" />
                <Field name="ingredientAmount" placeholder="Amount" />
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
              <ul>
                {values.ingredients.map((ing, index) => (
                  <li key={index}>
                    {ing.name} — {ing.amount}
                    <button type="button" onClick={() => remove(index)}>
                      🗑
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </FieldArray>

        <div>
          <label>Instructions</label>
          <Field
            name="instructions"
            as="textarea"
            placeholder="Enter instructions"
          />
          <ErrorMessage name="instructions" component="div" />
        </div>

        <button type="submit">Publish Recipe</button>
      </Form>
    </Formik>
  );
}
