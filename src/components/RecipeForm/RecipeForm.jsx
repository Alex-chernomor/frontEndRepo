import React from "react";
import css from "./RecipeForm.module.css";
import { Field, Formik, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
import SectionTitle from "../SectionTitle/SectionTitle.jsx";

export default function RecipeForm() {
  return (
    <>
      <SectionTitle>Add Recipe</SectionTitle>

      <Formik>
        <Form>
          <h3>General Information</h3>
          <ul>
            <li>
              <label>Recipe Title</label>
              <Field type="text" name="recipeTitle" />
              <ErrorMessage
                className={css.error}
                name="recipeTitle"
                component="p"
              />
            </li>
            <li>
              <label>Recipe Description</label>
              <Field type="text" name="recipeDescription" />
              <ErrorMessage
                className={css.error}
                name="recipeDescription"
                component="p"
              />
            </li>
            <li>
              <label>Cooking time in minutes</label>
              <Field type="text" name="cookingTime" />
              <ErrorMessage
                className={css.error}
                name="cookingTime"
                component="p"
              />
            </li>
            <li>
              <label>Calories</label>
              <Field type="text" name="calories" />
              <ErrorMessage
                className={css.error}
                name="calories"
                component="p"
              />
            </li>
            <li>
              <label>Category</label>
              <Field type="select" name="category" />
              <ErrorMessage
                className={css.error}
                name="category"
                component="p"
              />
            </li>
          </ul>
          <h3>Ingredients</h3>
          <ul>
            <li>
              {" "}
              <label>Name</label>
              <Field type="select" name="ingredientName" />
              <ErrorMessage
                className={css.error}
                name="ingredientName"
                component="p"
              />
            </li>
            <li>
              <label>Amount</label>
              <Field type="select" name="amount" />
              <ErrorMessage className={css.error} name="amount" component="p" />
            </li>
          </ul>
          <button>Add new Ingredient</button>
          <div>
            <p>Name:</p>
            <ul></ul>
            <p>Amount:</p>
            <ul></ul>
            <h3>Instructions</h3>
            <Field type="text" />
            <button>Publish Recipe</button>
          </div>
          <div>
            <label>Upload Photo</label>
            <Field type="file" name="uploadPhoto" />
            <ErrorMessage
              className={css.error}
              name="uploadPhoto"
              component="p"
            />
          </div>
        </Form>
      </Formik>
    </>
  );
}
