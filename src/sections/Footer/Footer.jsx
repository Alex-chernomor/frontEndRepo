import Logo from "../../components/Logo/Logo";
import FooterNav from "../../components/FooterNav/FooterNav";
import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={`container ${css.footerContainer}`}>
        <Logo />
        <p className={css.footerText}>
          2025 CookingCompanion. All rights reserved.
        </p>
        <FooterNav />
      </div>
    </footer>
  );
}
