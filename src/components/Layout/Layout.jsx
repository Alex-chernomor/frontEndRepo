import Outlet from "../../sections/Outlet/Outlet.jsx";
import Footer from "../../sections/Footer/Footer.jsx";
import Header from "../../sections/Header/Header.jsx";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Outlet children={children} />
      <Footer />
    </>
  );
}
