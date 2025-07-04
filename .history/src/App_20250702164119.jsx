import React from "react";
import Header from "./sections/Header/Header";
// import ModalWindow from "./components/ModalWindow/ModalWindow";

export default function App() {
  return (
    <div>
      <Header />
      {/* <ModalWindow /> */}
      <RecipeForm />
    </div>
  );
}
