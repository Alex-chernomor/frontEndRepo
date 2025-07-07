import React, { useState, useRef } from "react";
import { Field, Form, Formik, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import css from "./RecipeForm.module.css";

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
  photo: Yup.mixed().required("Required"),
});

export default function RecipeForm({ onAdd }) {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrop = (event, setFieldValue) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFieldValue("photo", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue("photo", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        cookingTime: "",
        calories: "",
        category: "",
        ingredients: [{ name: "", amount: "" }],
        instructions: "",
        photo: null,
        ingredientName: "",
        ingredientAmount: "",
      }}
      validationSchema={RecipeSchema}
      onSubmit={(values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("cookingTime", values.cookingTime);
        formData.append("calories", values.calories);
        formData.append("category", values.category);
        formData.append("instructions", values.instructions);
        formData.append("photo", values.photo);
        formData.append("ingredients", JSON.stringify(values.ingredients));
        onAdd(formData);
      }}
    >
      {({ values, setFieldValue }) => (
        <div className={css.formWrapper}>
          <Form className={css.formRecipe}>
            <h1 className={css.sectionTitle}>Add Recipe</h1>

            <div className={css.order1}>
              <p className={css.subSectionTitle}>Upload Photo</p>
              <div
                className={css.photoContainer}
                onClick={handleClick}
                onDrop={(e) => handleDrop(e, setFieldValue)}
                onDragOver={(e) => e.preventDefault()}
              >
                {!preview && (
                  <svg width="82" height="82" viewBox="0 0 82 82" fill="none">
                    <path
                      d="M50.363 44.7452C50.363 49.9162 46.171 54.1082 41 54.1082C35.829 54.1082 31.637 49.9162 31.637 44.7452C31.637 39.5741 35.829 35.3822 41 35.3822C46.171 35.3822 50.363 39.5741 50.363 44.7452Z"
                      stroke="#070707"
                      strokeWidth="2.5625"
                    />
                    <path
                      d="M16.6563 57.6562L16.6563 34.8358C16.6563 31.0007 19.7652 27.8918 23.6002 27.8918C26.2304 27.8918 28.6348 26.4058 29.8111 24.0533L31.3848 20.9058C32.687 18.3014 35.3489 16.6562 38.2608 16.6563L43.7393 16.6563C46.6511 16.6563 49.313 18.3014 50.6152 20.9058L52.1889 24.0533C53.3652 26.4058 55.7696 27.8919 58.3998 27.8919C62.2348 27.8919 65.3438 31.0008 65.3438 34.8358V57.6562C65.3438 61.9019 61.9019 65.3437 57.6563 65.3437H24.3437C20.0981 65.3437 16.6562 61.9019 16.6563 57.6562Z"
                      stroke="#070707"
                      strokeWidth="2.5625"
                    />
                  </svg>
                )}
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
                  <img
                    src={preview}
                    alt="Preview"
                    className={css.previewImage}
                  />
                )}
              </div>
            </div>

            <div>
              <p className={css.subSectionTitle}>General Information</p>

              <div className={css.fieldGroup}>
                <label htmlFor="title">Recipe Title</label>
                <Field
                  id="title"
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

              <div className={css.fieldGroup}>
                <label htmlFor="description">Recipe Description</label>
                <Field
                  id="description"
                  name="description"
                  as="textarea"
                  placeholder="Enter a brief description of your recipe"
                  className={css.input}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.fieldGroup}>
                <label htmlFor="cookingTime">Cooking time in minutes</label>
                <Field
                  id="cookingTime"
                  name="cookingTime"
                  type="number"
                  className={css.input}
                />
                <ErrorMessage
                  name="cookingTime"
                  component="div"
                  className={css.error}
                />
              </div>

              <div className={css.inlineFields}>
                <div>
                  <label htmlFor="calories">Calories</label>
                  <Field id="calories" name="calories" className={css.input} />
                  <ErrorMessage
                    name="calories"
                    component="div"
                    className={css.error}
                  />
                </div>

                <div>
                  <label htmlFor="category">Category</label>
                  <Field
                    id="category"
                    name="category"
                    as="select"
                    className={css.input}
                  >
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
              </div>

              <FieldArray name="ingredients">
                {({ push, remove }) => (
                  <div className={css.ingredientWrapper}>
                    <p className={css.subSectionTitle}>Ingredients</p>

                    <div className={css.ingredientRow}>
                      <div className={css.fieldGroup}>
                        <label htmlFor="ingredientName">Name</label>
                        <Field
                          id="ingredientName"
                          name="ingredientName"
                          as="select"
                          className={css.input}
                        >
                          <option value="">Select ingredient</option>
                          <option value="Broccoli">Broccoli</option>
                          <option value="Tomato">Tomato</option>
                          <option value="Carrot">Carrot</option>
                          <option value="Chicken">Chicken</option>
                        </Field>
                      </div>

                      <div className={css.fieldGroup}>
                        <label htmlFor="ingredientAmount">Amount</label>
                        <Field
                          id="ingredientAmount"
                          name="ingredientAmount"
                          placeholder="100g"
                          className={css.input}
                        />
                      </div>
                    </div>

                    <div className={css.addIngredientWrapper}>
                      <button
                        type="button"
                        className={css.addIngredient}
                        onClick={() => {
                          if (
                            values.ingredientName &&
                            values.ingredientAmount
                          ) {
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

                    {values.ingredients.length > 0 && (
                      <div className={css.ingredientTable}>
                        <div className={css.ingredientHeader}>
                          <span className={css.ingredientColumn}>Name:</span>
                          <span className={css.ingredientColumn}>Amount:</span>
                          <span className={css.ingredientColumn}></span>
                        </div>

                        <div className={css.ingredientList}>
                          {values.ingredients.map((ing, index) => {
                            return (
                              <div key={index} className={css.ingredientItem}>
                                <span className={css.ingredientText}>
                                  {ing.name}
                                </span>
                                <span className={css.ingredientText}>
                                  {ing.amount}
                                </span>
                                <button
                                  type="button"
                                  className={css.deleteBtn}
                                  onClick={() => remove(index)}
                                  aria-label="Delete ingredient"
                                ></button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </FieldArray>

              <div>
                <p className={css.subSectionTitle}>Instructions</p>
                <Field
                  id="instructions"
                  name="instructions"
                  as="textarea"
                  placeholder="Enter a text"
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
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
