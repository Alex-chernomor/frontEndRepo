import { Outlet } from "react-router-dom";
import Footer from "../../sections/Footer/Footer.jsx";
import Header from "../../sections/Header/Header.jsx";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {/* <main id="main">{children}</main> */}
      <Outlet children={children} />
      <Footer />
    </>
  );
}
