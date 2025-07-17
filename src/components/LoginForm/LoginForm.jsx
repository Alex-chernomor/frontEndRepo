import * as Yup from "yup";
import clsx from "clsx";

import { Formik, Form, Field, ErrorMessage } from "formik";
import CreateLink from "../CreateLink/CreateLink.jsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations.js";

import css from "./LoginForm.module.css";
import { Eye, EyeCrossed } from "./Icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordEye, setPasswordEye] = useState(false);

  const handlePasswordClick = () => {
    setPasswordEye((prev) => !prev);
  };

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(login(values)).unwrap();
      actions.resetForm();
      navigate("/");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error?.response?.data?.message || error.message || "Login failed";

      // Показуємо повідомлення під полем
      actions.setFieldError("email", errorMessage);
      actions.setFieldError("password", errorMessage);

      // Робимо поле "touched", щоб рамка стала червоною
      actions.setTouched({ email: true, password: true }, false);

      // Показуємо toast-помилку
      toast.error(errorMessage);
    }
  };

  return (
    <div className={css.containerLoginForm}>
      <h2 className={css.titleLoginForm}>Login</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={UserSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.formLoginForm} autoComplete="off">
          <label className={css.labelLoginForm}>
            Enter your email address
            <Field name="email">
              {({ field, meta }) => (
                <>
                  <input
                    {...field}
                    type="email"
                    placeholder="email@gmail.com"
                    className={clsx(
                      css.fieldLoginForm,
                      meta.touched && meta.error && css.errorInput
                    )}
                  />
                  <div className={css.errorFixed}>
                    {meta.touched && meta.error ? meta.error : "\u00A0"}
                  </div>
                </>
              )}
            </Field>
            {/* <Field name="email">
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
            <ErrorMessage name="email" className={css.error} component="span" /> */}
          </label>

          <label className={css.labelLoginForm}>
            Enter your password
            <div className={css.fieldWrapperLoginForm}>
              <Field name="password">
                {({ field, meta }) => (
                  <>
                    <input
                      {...field}
                      type={passwordEye ? "text" : "password"}
                      placeholder="*********"
                      className={clsx(
                        css.fieldLoginForm,
                        meta.touched && meta.error && css.errorInput
                      )}
                    />
                    <div className={css.errorFixed}>
                      {meta.touched && meta.error ? meta.error : "\u00A0"}
                    </div>
                  </>
                )}
              </Field>
              {/* <Field name="password">
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
              </Field> */}
              <button
                type="button"
                className={css.eyeButton}
                onClick={handlePasswordClick}
                aria-label={passwordEye ? "Hide password" : "Show password"}
              >
                {passwordEye ? <Eye /> : <EyeCrossed />}
              </button>
            </div>
            {/* <ErrorMessage
              name="password"
              className={css.error}
              component="span"
            /> */}
          </label>

          <button className={css.buttonLoginForm} type="submit">
            Login
          </button>
        </Form>
      </Formik>

      <p className={css.descriptionRedirect}>
        Don't have an account?{" "}
        <CreateLink
          className={css.linkRedirect}
          text="Register"
          to="/api/auth/register"
        />
      </p>
    </div>
  );
}
