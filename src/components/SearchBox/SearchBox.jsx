import React from "react";
import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import css from "./SearchBox.module.css";
import { useDispatch } from "react-redux";
import { fetchRecipes } from "../../redux/recipes/operations";

export default function SearchBox() {
  const dispatch = useDispatch();

  return (
    <>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={(values, actions) => {
          if (!values.search.trim()) {
            toast.error("Please enter something in the search field!");
            return;
          }
          // Виклик thunk з параметром query
          dispatch(fetchRecipes({ query: values.search }));
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <Field
            className={css.input}
            type="text"
            autoComplete="off"
            name="search"
            autoFocus
            placeholder="Search recipes"
          />
          <Button className={css.button} type="submit">
            Search
          </Button>
        </Form>
      </Formik>
    </>
  );
}