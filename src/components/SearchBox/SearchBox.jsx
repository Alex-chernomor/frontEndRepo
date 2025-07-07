import React from 'react';
import { Field, Form, Formik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../Button/Button';
import css from './SearchBox.module.css';
import { useDispatch } from 'react-redux';
import { fetchRecipesByName } from '../../redux/recipes/operations';

// import React from 'react';
// import { Field, Form, Formik } from 'formik';
// import toast, { Toaster } from 'react-hot-toast';
// import Button from '../Button/Button';
// import css from './SearchBox.module.css';
// import { useDispatch } from 'react-redux';
// import { fetchRecipesByName } from '../../redux/recipes/operations';

export default function SearchBox() {
  const dispatch = useDispatch();

  return (
    <>
      <Toaster position="top-right" />

      <Formik
        initialValues={{ search: '' }}
        onSubmit={async (values, actions) => {
          const trimmedValue = values.search.trim();

          if (!trimmedValue) {
            toast.error('Please enter something in the search field!');
            dispatch(setSearchTerm(''));

            //             toast.error('Please enter something in the search field!');

            return;
          }

          try {
            const result = await dispatch(
              fetchRecipesByName({ query: trimmedValue })
            );

            if (result.type.endsWith('rejected')) {
              toast.error('Recipe not found!');
              dispatch(setSearchTerm(''));

              //             const result = await dispatch(
              //               fetchRecipesByName({ query: trimmedValue })
              //             );

              //             if (result.type.endsWith('rejected')) {
              //               toast.error('Recipe not found!');

              return;
            }

            const recipesData = result?.payload;
            const recipesArray = recipesData?.data?.data;

            const isValidRecipes =
              Array.isArray(recipesArray) && recipesArray.length > 0;

            if (!isValidRecipes) {
              toast.error('Recipe not found!');
              dispatch(setSearchTerm(''));
              return;
            }

            // Пошук успішний — оновлюємо searchTerm
            dispatch(setSearchTerm(trimmedValue));
          } catch {
            toast.error('Recipe not found!');
            dispatch(setSearchTerm(''));
          }

          //             const isValidRecipes =
          //               Array.isArray(recipesArray) && recipesArray.length > 0;

          //             if (!isValidRecipes) {
          //               toast.error('Recipe not found!');
          //               return;
          //             }
          //           } catch {
          //             toast.error('Recipe not found!');
          //           }

          actions.resetForm();
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
