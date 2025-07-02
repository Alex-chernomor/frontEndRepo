import { Formik, Form, Field } from "formik";
// import { useDispatch } from "react-redux";
// import { login } from "../../redux/auth/operations";

import css from "./LoginForm.module.css";

export default function LoginForm() {
  return (
    <section className={css.sectionLoginForm}>
      <div className={css.container}>
        <div className={css.wrapperLoginForm}>
          <h3 className={css.titleLoginForm}>Login</h3>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
          >
            <Form className={css.loginForm} autoComplete="off">
              <label className={css.loginFormLabel}>
                <>Enter your email address</>
                <Field
                  type="email"
                  name="email"
                  className={css.loginFormField}
                  placeholder="email@gmail.com"
                />
              </label>

              <label className={css.label}>
                Enter your password
                <Field
                  type="password"
                  name="password"
                  className={css.loginFormField}
                  placeholder="*********"
                />
              </label>
              <button className={css.button} type="submit">
                Login
              </button>
            </Form>
          </Formik>

          <p className={css.descriptionRedirect}>
            Don't have an account?{" "}
            <a className={css.linkRedirect} href="#">
              Register
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
