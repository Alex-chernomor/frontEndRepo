import MainTitle from "../../components/MainTitle/MainTitle";
import SearchBox from "../../components/SearchBox/SearchBox";
import css from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={css.hero}>
      <div className={css.container}>
        <MainTitle />
        <SearchBox />
      </div>
    </section>
  );
};

export default Hero;
