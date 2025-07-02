import React from 'react';
import Header from './sections/Header/Header';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
// import ModalWindow from "./components/ModalWindow/ModalWindow";

export default function App() {
  return (
    <div>
      <Header />
      {/* <ModalWindow /> */}
      <RegistrationPage />
    </div>
  );
}
