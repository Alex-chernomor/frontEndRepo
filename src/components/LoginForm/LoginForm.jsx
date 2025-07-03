import * as Yup from "yup";
import clsx from "clsx";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import css from "./LoginForm.module.css";
import { Eye, EyeCrossed } from "./Icons";

const initialValues = {
  email: "",
  password: "",
};

const UserSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .max(128, "Too long!")
    .required("This field is required"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .max(128, "At most 128 characters")
    .required("This field is required"),
});

export default function LoginForm() {
  const [passwordEye, setPasswordEye] = useState(false);

  const handlePasswordClick = () => {
    setPasswordEye((prev) => !prev);
  };

  return (
    <div className={css.containerLoginForm}>
      <h3 className={css.titleLoginForm}>Login</h3>

      <Formik
        initialValues={initialValues}
        // onSubmit={handleSubmit}
        validationSchema={UserSchema}
      >
        <Form className={css.formLoginForm} autoComplete="off">
          <label className={css.labelLoginForm}>
            Enter your email address
            <Field name="email">
              {({ field, meta }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="email@gmail.com"
                  className={clsx(
                    css.fieldLoginForm,
                    meta.touched && meta.error && css.errorInput
                  )}
                />
              )}
            </Field>
            <ErrorMessage name="email" className={css.error} component="span" />
          </label>

          <label className={css.labelLoginForm}>
            Enter your password
            <div className={css.fieldWrapperLoginForm}>
              <Field name="password">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type={passwordEye ? "text" : "password"}
                    placeholder="*********"
                    className={clsx(
                      css.fieldLoginForm,
                      meta.touched && meta.error && css.errorInput
                    )}
                  />
                )}
              </Field>
              <button
                type="button"
                className={css.eyeButton}
                onClick={handlePasswordClick}
                aria-lable={passwordEye ? "Show password" : "Hide password"}
              >
                {passwordEye ? <Eye /> : <EyeCrossed />}
              </button>
            </div>
            <ErrorMessage
              name="password"
              className={css.error}
              component="span"
            />
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
