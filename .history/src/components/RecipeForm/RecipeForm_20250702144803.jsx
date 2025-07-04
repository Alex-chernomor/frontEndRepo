import React from "react";
import { Form, Formik } from "formik";

const RecipeForm = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form>
        <Field type="text" name="username"></Field>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

// export default function RecipeForm() {
//   return <div>RecipeForm</div>;
// }
