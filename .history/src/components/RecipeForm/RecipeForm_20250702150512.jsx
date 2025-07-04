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

export default function RecipeForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{
        recipeName: "",
      }}
      onSubmit={() => {}}
    >
      <Form>
        <Field type="text" name="recipename" />
        <Field type="text" name="recipedescr" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
