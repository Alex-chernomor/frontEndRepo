import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
//! уважно з тим що знизу
import { register } from '../../redux/auth/operations';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import styles from './RegistrationForm.module.css';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const initialValues = {
  name: '',
  email: '',
  password: '',
  toggle: false,
};
const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Too short!')
    .max(16, 'Too long!')
    .required('This field is required'),
  email: Yup.string()
    .email('Invalid email')
    .max(128, 'Too long!')
    .required('This field is required'),
  password: Yup.string()
    .min(8, 'At least 8 characters')
    .max(128, 'At most 128 characters')
    .required('This field is required'),
  toggle: Yup.boolean().oneOf([true], 'You must agree to continue'),
});

const getLinkStyles = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.active);
};

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
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
                ></input>
              )}
            </Field>
            <ErrorMessage
              name="name"
              className={styles.error}
              component="span"
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
                ></input>
              )}
            </Field>
            <ErrorMessage
              name="email"
              className={styles.error}
              component="span"
            />
          </label>
          <label className={styles.label}>
            Create a strong password
            <Field name="password">
              {({ field, meta }) => (
                <input
                  {...field}
                  type="password"
                  className={clsx(
                    styles.input,
                    meta.touched && meta.error && styles.errorInput
                  )}
                ></input>
              )}
            </Field>
            <ErrorMessage
              name="password"
              className={styles.error}
              component="span"
            />
          </label>
          <label className={styles.label}>
            Repeat your password
            <Field name="password">
              {({ field, meta }) => (
                <input
                  {...field}
                  type="password"
                  className={clsx(
                    styles.input,
                    meta.touched && meta.error && styles.errorInput
                  )}
                ></input>
              )}
            </Field>
            <ErrorMessage
              name="password"
              className={styles.error}
              component="span"
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
        Already have an account?{' '}
        <NavLink className={getLinkStyles}>Log in</NavLink>
      </p>
    </div>
  );
}
