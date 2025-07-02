import { Formik, Form, Field } from "formik";
import { NavLink } from "react-router-dom";

// import { useDispatch } from "react-redux";
// import { login } from "../../redux/auth/operations";

import css from "./LoginForm.module.css";

export default function LoginForm() {
  return (
    <div className={css.containerLoginForm}>
      <h3 className={css.titleLoginForm}>Login</h3>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
      >
        <Form className={css.formLoginForm} autoComplete="off">
          <label className={css.labelLoginForm}>
            Enter your email address
            <Field
              type="email"
              name="email"
              className={css.fieldLoginForm}
              placeholder="email@gmail.com"
            />
          </label>

          <label className={css.labelLoginForm}>
            Enter your password
            <div className={css.fieldWrapperLoginForm}>
              <Field
                type="password"
                name="password"
                className={css.fieldLoginForm}
                placeholder="*********"
              />
            </div>
          </label>
          <button className={css.buttonLoginForm} type="submit">
            Login
          </button>
        </Form>
      </Formik>

      <p className={css.descriptionRedirect}>
        Don't have an account?{" "}
        <NavLink className={css.linkRedirect}>Register</NavLink>
      </p>
    </div>
  );
}
