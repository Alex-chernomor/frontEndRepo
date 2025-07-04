import React from "react";
import Header from "./sections/Header/Header";
// import ModalWindow from "./components/ModalWindow/ModalWindow";
import RecipeForm from "./components/RecipeForm/RecipeForm.jsx";

export default function App() {
  return (
    <div>
      <Header />
      {/* <ModalWindow /> */}
      <RecipeForm />
    </div>
  );
}
