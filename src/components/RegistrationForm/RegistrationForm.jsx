
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Field, Form, Formik, ErrorMessage } from "formik";
import styles from "./RegistrationForm.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Eye, EyeCrossed } from "../Icons/Icons";
import { useState } from "react";
import { register } from "../../redux/auth/operations";

const initialValues = {
  name: "",
  email: "",
  password: "",
  // confirmPassword: "",
  // toggle: false,
};

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Too short!")
    .max(16, "Too long!")
    .required("This field is required"),
  email: Yup.string()
    .email("Invalid email")
    .max(128, "Too long!")
    .required("This field is required"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .max(128, "At most 128 characters")
    .required("This field is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  toggle: Yup.boolean().oneOf([true], "You must agree to continue"),
});

const getLinkStyles = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.active);
};

export default function RegistrationForm() {
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPassEye, setConfirmPassEye] = useState(false);
  const dispatch = useDispatch();

  const handlePasswordClick = () => {
    setPasswordEye((prev) => !prev);
  };

  const handleConfirmPassClick = () => {
    setConfirmPassEye((prev) => !prev);
  };

const handleSubmit = async (values, actions) => {
    const { confirmPassword, toggle, ...dataToSend } = values;
    try {
      await dispatch(register(dataToSend)).unwrap();

      actions.resetForm();
      toast.success(Welcome, ${loginResult.user.name}!);
      navigate('/');
    } catch (error) {
      actions.setFieldError('email', error?.message || 'Registration failed');
      toast.error(error?.message);
      console.error(error?.message);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.header}>Register</h1>
      <p className={styles.text}>
        Join our community of culinary enthusiasts, save your favorite recipes,
        and share your cooking creations
      </p>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={UserSchema}
      >
        <Form className={styles.form} autoComplete="off">
          <label className={styles.label}>
            Enter your name
            <Field name="name">
              {({ field, meta }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Max"
                  className={clsx(
                    styles.input,
                    meta.touched && meta.error && styles.errorInput
                  )}
                />
              )}
            </Field>
            <ErrorMessage
              name="name"
              component="span"
              className={styles.error}
            />
          </label>

          <label className={styles.label}>
            Enter your email address
            <Field name="email">
              {({ field, meta }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="email@gmail.com"
                  className={clsx(
                    styles.input,
                    meta.touched && meta.error && styles.errorInput
                  )}
                />
              )}
            </Field>
            <ErrorMessage
              name="email"
              component="span"
              className={styles.error}
            />
          </label>

<label className={styles.label}>
            Create a strong password
            <div className={styles.inputWrapper}>
              <Field name="password">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type={passwordEye ? "text" : "password"}
                    placeholder="*********"
                    className={clsx(
                      styles.input,
                      meta.touched && meta.error && styles.errorInput
                    )}
                  />
                )}
              </Field>
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={handlePasswordClick}
                aria-label={passwordEye ? "Hide password" : "Show password"}
                aria-pressed={passwordEye}
              >
                {passwordEye ? <Eye /> : <EyeCrossed />}
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="span"
              className={styles.error}
            />
          </label>

          <label className={styles.label}>
            Repeat your password
            <div className={styles.inputWrapper}>
              <Field name="confirmPassword">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type={confirmPassEye ? "text" : "password"}
                    placeholder="*********"
                    className={clsx(
                      styles.input,
                      meta.touched && meta.error && styles.errorInput
                    )}
                  />
                )}
              </Field>
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={handleConfirmPassClick}
                aria-label={confirmPassEye ? "Hide password" : "Show password"}
                aria-pressed={confirmPassEye}
              >
                {confirmPassEye ? <Eye /> : <EyeCrossed />}
              </button>
            </div>
            <ErrorMessage
              name="confirmPassword"
              component="span"
              className={styles.error}
            />
          </label>

          <div className={styles.checkWrapper}>
            <label className={styles.checkLabel}>
              <Field
                type="checkbox"
                name="toggle"
                className={styles.checkInput}
              />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>
            <ErrorMessage
              name="toggle"
              component="span"
              className={styles.error}
            />
          </div>

          <button type="submit" className={styles.button}>
            Create account
          </button>
        </Form>
      </Formik>

      <p className={styles.text}>
        Already have an account?{" "}
        <NavLink to="/api/auth/login" className={getLinkStyles}>
          Log in
        </NavLink>
      </p>
    </div>
  );
}
