import MainTitle from "../../components/MainTitle/MainTitle";
import SearchBox from "../../components/SearchBox/SearchBox";
import css from "./Hero.module.css";

const Hero = ({ onSearchTermChange }) => {
  return (
    <section className={css.hero}>
      <div className={css.container}>
        <div className={css.contentContainer}>
          <MainTitle />
          <SearchBox onSearchTermChange={onSearchTermChange} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
