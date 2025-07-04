import Footer from "../../sections/Footer/Footer.jsx";
import Header from "../../sections/Header/Header.jsx";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
