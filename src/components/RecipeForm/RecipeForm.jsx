import React, { useState, useRef, useEffect } from "react";
import {
  Field,
  Form,
  Formik,
  ErrorMessage,
  FieldArray,
  useFormikContext,
} from "formik";
import css from "./RecipeForm.module.css";
import * as Yup from "yup";
import Select from "react-select";
import { selectFilterCategories } from "../../redux/filters/selectors.js";
import { useDispatch, useSelector } from "react-redux";
import { useIngredients } from "../../context/useIngredients.js";
import { toast } from "react-hot-toast";
import { createRecipe } from "../../redux/recipes/operations.js";
import { useNavigate } from "react-router-dom";

const MAX_IMAGE_SIZE_MB = 2;
const LOCALSTORAGE_KEY = "recipeFormData";

const RecipeSchema = Yup.object().shape({
  title: Yup.string().max(64, "Max 64 characters").required("Required"),

  description: Yup.string().max(200, "Max 200 characters").required("Required"),

  cookingTime: Yup.number()
    .typeError("Must be a number")
    .min(1, "Minimum 1 minute")
    .max(360, "Maximum 360 minutes")
    .required("Required"),

  calories: Yup.number()
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .min(1, "Minimum 1 calorie")
    .max(10000, "Maximum 10000 calories"),

  category: Yup.string()
    .oneOf(
      [
        "Seafood",
        "Lamb",
        "Starter",
        "Chicken",
        "Beef",
        "Dessert",
        "Vegan",
        "Pork",
        "Vegetarian",
        "Miscellaneous",
        "Pasta",
        "Breakfast",
        "Side",
        "Goat",
        "Soup",
      ],
      "Invalid category"
    )
    .required("Required"),

  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Required"),
        amount: Yup.string()
          .min(2, "Minimum 2 characters")
          .max(16, "Maximum 16 characters")
          .required("Required"),
      })
    )
    .min(1, "At least one ingredient required"),

  instructions: Yup.string()
    .max(1200, "Max 1200 characters")
    .required("Required"),

  photo: Yup.mixed()
    .nullable()
    .test("fileSize", "Image is too large (max 2MB)", (value) => {
      if (!value) return true;
      return value.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return true;
      return ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
        value.type
      );
    }),
});

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
    padding: "0 12px",
    width: "100%",
    height: "46px",
    fontSize: "18px",
    color: "#000",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(78, 70, 180, 0.2)" : "none",
    "&:hover": {
      border: "2px solid #000",
    },
  }),
};

function AutoSaveFormData() {
  const { values } = useFormikContext();

  useEffect(() => {
    const toSave = { ...values, photo: null };
    localStorage.setItem("recipeFormData", JSON.stringify(toSave));
  }, [values]);

  return null;
}

export default function RecipeForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const categories = useSelector(selectFilterCategories);
  const allIngredients = useIngredients();

  const saved = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  const initialValues = saved || {
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
  };

  const handleDrop = (event, setFieldValue) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFieldValue("photo", file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFieldValue("photo", file);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = (setFieldValue) => {
    setPreview(null);
    setFieldValue("photo", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // очищення інпута
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RecipeSchema}
      onSubmit={(values, { resetForm }) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("time", values.cookingTime);

        if (values.calories) {
          formData.append("cals", values.calories || "-");
        }
        formData.append("category", values.category);
        formData.append("instructions", values.instructions);

        values.ingredients.forEach((ingredient, index) => {
          formData.append(`ingredients[${index}][id]`, ingredient.id);
          formData.append(`ingredients[${index}][measure]`, ingredient.amount);
        });

        if (values.photo) {
          formData.append("thumb", values.photo);
        }
        const loadingToast = toast.loading("Adding recipe...");

        dispatch(createRecipe({ recipe: formData }))
          .unwrap()
          .then((response) => {
            toast.dismiss(loadingToast);
            toast.success("Recipe added successfully!");
            localStorage.removeItem(LOCALSTORAGE_KEY);
            resetForm();
            setPreview(null);
            const newRecipeId = response._id || response.id;
            navigate(`/recipe/${newRecipeId}`);
          })
          .catch((error) => {
            console.error("Add recipe error:", error);
            toast.dismiss(loadingToast);
            toast.error("Failed to add recipe. Try again.");
          });
      }}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <div className={css.formWrapper}>
          <h2 className={css.sectionTitle}>Add Recipe</h2>
          <Form onSubmit={handleSubmit} className={css.formRecipe}>
            {" "}
            <AutoSaveFormData />
            <div className={css.photoUpload}>
              <p className={css.photoLabel}>Upload Photo</p>
              <div
                className={css.dropZone}
                onClick={handleClick}
                onDrop={(e) => handleDrop(e, setFieldValue)}
                onDragOver={(e) => e.preventDefault()}
              >
                {!preview && (
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
                  className={css.hiddenInput}
                  ref={fileInputRef}
                  onChange={(e) => handleFileChange(e, setFieldValue)}
                />
                {preview && (
                  <div className={css.preview}>
                    <img src={preview} alt="Preview" className={css.image} />
                    <button
                      type="button"
                      className={css.removeBtn}
                      onClick={() => handleRemoveImage(setFieldValue)}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className={css.formSectionsWrapper}>
              <div className={css.generalInfoWrapper}>
                <p className={css.formSectionTitle}>General Information</p>
                <div className={css.itemFormWrapper}>
                  <label className={css.itemFormTitle} htmlFor="title">
                    Recipe Title
                  </label>
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
                <div className={css.itemFormWrapper}>
                  <label className={css.itemFormTitle} htmlFor="description">
                    Recipe Description
                  </label>
                  <Field
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
                <div className={css.itemFormWrapper}>
                  <label className={css.itemFormTitle} htmlFor="cookingTime">
                    Cooking time in minutes
                  </label>
                  <Field
                    name="cookingTime"
                    type="number"
                    min="1"
                    placeholder="10"
                    className={css.input}
                  />
                  <ErrorMessage
                    name="cookingTime"
                    component="div"
                    className={css.error}
                  />
                </div>
                <div className={css.calsCategWrapper}>
                  <div className={css.itemCatWrapper}>
                    <label className={css.itemFormTitle} htmlFor="calories">
                      Calories
                    </label>
                    <Field
                      name="calories"
                      type="number"
                      placeholder="150"
                      className={css.catInput}
                    />
                    <ErrorMessage
                      name="calories"
                      component="div"
                      className={css.error}
                    />
                  </div>
                  <div className={css.itemCatWrapper}>
                    <label className={css.itemFormTitle} htmlFor="category">
                      Category
                    </label>
                    <Select
                      options={categories.map((cat) => ({
                        label: cat.name,
                        value: cat.name,
                      }))}
                      value={
                        categories
                          .map((cat) => ({ label: cat.name, value: cat.name }))
                          .find((opt) => opt.label === values.category) || null
                      }
                      onChange={(selectedOption) => {
                        setFieldValue("category", selectedOption.value);
                      }}
                      placeholder="Soup"
                      styles={customSelectStyles}
                    />
                    <ErrorMessage
                      name="category"
                      component="div"
                      className={css.error}
                    />
                  </div>{" "}
                </div>
              </div>
              <FieldArray name="ingredients">
                {({ push, remove }) => (
                  <div className={css.ingredientsFormWrapper}>
                    <p className={css.formSectionTitle}>Ingredients</p>
                    <div className={css.ingredientRow}>
                      <div
                        className={`${css.inputGroup} ${css.inputGroupName}`}
                      >
                        <label className={css.itemFormTitle}>Name</label>
                        <Select
                          options={allIngredients.map((ing) => ({
                            label: ing.name,
                            value: ing._id,
                          }))}
                          value={
                            allIngredients
                              .map((ing) => ({
                                label: ing.name,
                                value: ing._id,
                              }))
                              .find(
                                (opt) => opt.value === values.ingredientName
                              ) || null
                          }
                          onChange={(selectedOption) => {
                            setFieldValue(
                              "ingredientName",
                              selectedOption ? selectedOption.value : ""
                            );
                          }}
                          placeholder="Broccoli"
                          isClearable
                          styles={customSelectStyles}
                          classNamePrefix="select"
                        />
                        <ErrorMessage
                          name="ingredientAmount"
                          component="div"
                          className={css.error}
                        />
                      </div>
                      <div
                        className={`${css.inputGroup} ${css.inputGroupAmount}`}
                      >
                        <label
                          htmlFor="ingredientAmount"
                          className={css.itemFormTitle}
                        >
                          Amount
                        </label>
                        <Field
                          name="ingredientAmount"
                          placeholder="100g"
                          className={css.inputFluid}
                          id="ingredientAmount"
                        />{" "}
                        <ErrorMessage
                          name="ingredientAmount"
                          component="div"
                          className={css.error}
                        />
                      </div>
                    </div>
                    <div className={css.addIngredientWrapper}>
                      <button
                        className={css.addIngredient}
                        type="button"
                        onClick={() => {
                          if (
                            values.ingredientName &&
                            values.ingredientAmount
                          ) {
                            push({
                              _id: values.ingredientName,
                              measure: values.ingredientAmount,
                            });
                            setFieldValue("ingredientName", "");
                            setFieldValue("ingredientAmount", "");
                          }
                          console.log(values.ingredients);
                        }}
                      >
                        Add new ingredient
                      </button>
                    </div>
                    <table className={css.table}>
                      <thead>
                        <tr>
                          <th>Name:</th>
                          <th>Amount:</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.ingredients.map((ing, index) => {
                          const ingredientName =
                            allIngredients.find((item) => item._id === ing._id)
                              ?.name || "Unknown";
                          return (
                            <tr key={index}>
                              <td>{ingredientName}</td>
                              <td>{ing.measure}</td>
                              <td>
                                <button
                                  type="button"
                                  className={css.deleteBtn}
                                  onClick={() => remove(index)}
                                >
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 16.3846L12 9.80769M4.875 7.06731H6.51923M19.125 7.06731H17.4808M14.7404 7.06731H9.25962M14.7404 7.06731V5.97115C14.7404 5.36576 14.2496 4.875 13.6442 4.875H10.3558C9.75038 4.875 9.25962 5.36576 9.25962 5.97115V7.06731M14.7404 7.06731H17.4808M9.25962 7.06731H6.51923M17.4808 7.06731V16.9327C17.4808 18.1435 16.4992 19.125 15.2885 19.125H8.71154C7.50076 19.125 6.51923 18.1435 6.51923 16.9327V7.06731"
                                      stroke="black"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </FieldArray>
              <div className={css.instructionWrapper}>
                <label className={css.formSectionTitle} htmlFor="instructions">
                  Instructions
                </label>
                <Field
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
