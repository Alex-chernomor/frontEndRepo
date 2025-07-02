import React from "react";
import Header from "./sections/Header/Header";
// import ModalWindow from "./components/ModalWindow/ModalWindow";
import SearchBox from "./components/SearchBox/SearchBox.jsx";
import MainTitle from "./components/MainTitle/MainTitle.jsx";
export default function App() {
  return (
    <div>
      <Header />
      {/* <ModalWindow /> */}
      {/* <MainTitle />
      <SearchBox onSearch={handleSearch} /> */}
    </div>
  );
}
