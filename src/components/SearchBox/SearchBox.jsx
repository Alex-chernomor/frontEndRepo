import React from "react";
import css from "./SearchBox.module.css";
import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import Button from "../Button/Button";
export default function SearchBox({ onSearch }) {
  return (
    <>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={(values, actions) => {
          if (!values.search.trim()) {
            toast.error("Please enter something in the search field!");
          } else {
            onSearch(values.search);
            actions.resetForm();
          }
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
          <Button nameButton={css.button} type="submit">
            Search
          </Button>
        </Form>
      </Formik>
    </>
  );
}
