import MainTitle from '../../components/MainTitle/MainTitle';
import SearchBox from '../../components/SearchBox/SearchBox';
import css from './Hero.module.css';

const Hero = ({ onSearchTermChange }) => {
  return (
    <section className={css.hero}>
      <div className={css.container}>
        <MainTitle />
        <SearchBox onSearchTermChange={onSearchTermChange} />
      </div>
    </section>
  );
};

export default Hero;
