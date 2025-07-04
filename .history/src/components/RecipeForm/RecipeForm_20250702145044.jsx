import React from "react";
import { Field, Form, Formik } from "formik";

const RecipeForm = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form>
        <Field type="text" name="recipename" />
        <Field type="text" name="recipedescr" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

// export default function RecipeForm() {
//   return <div>RecipeForm</div>;
// }
