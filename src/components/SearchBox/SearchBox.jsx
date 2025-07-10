import { Field, Form, Formik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../Button/Button';
import css from './SearchBox.module.css';

export default function SearchBox({ setQueryParam }) {
  return (
    <>
      <Toaster position="top-right" />
      <Formik
        initialValues={{ search: '' }}
        onSubmit={async (values, actions) => {
          const trimmedValue = values.search.trim();
          if (!trimmedValue) {
            toast.error('Please enter something in the search field!');
            return;
          }

          setQueryParam(trimmedValue);
          actions.resetForm();
          // onSearchTermChange(trimmedValue);
          // try {
          //   const result = await dispatch(
          //     fetchRecipesByName({ query: trimmedValue })
          //   );
          //   if (result.type.endsWith('rejected')) {
          //     toast.error('Recipe not found!');
          //     return;
          //   }
          //   const recipesData = result?.payload;
          //   const recipesArray = recipesData?.data?.data;
          //   const isValidRecipes =
          //     Array.isArray(recipesArray) && recipesArray.length > 0;
          //   if (!isValidRecipes) {
          //     toast.error('Recipe not found!');
          //     return;
          //   }
          // } catch {
          //   toast.error('Recipe not found!');
          // }
          // actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <Field
            className={css.input}
            type="text"
            autoComplete="off"
            name="search"
            placeholder="Search recipes"
          />
          <Button className={css.button} type="submit">
            Search
          </Button>
        </Form>
      </Formik>
    </>
  );
}
