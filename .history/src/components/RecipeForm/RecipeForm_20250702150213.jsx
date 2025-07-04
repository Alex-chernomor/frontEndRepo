import React from "react";
import { Field, Form, Formik } from "formik";
import * Yup from 'yup';

const RecipeSchema = Yup.object().shape({
  
})

export default function RecipeForm() {
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
