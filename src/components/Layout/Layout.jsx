import Footer from "../../sections/Footer/Footer.jsx";
import Header from "../../sections/Header/Header.jsx";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
