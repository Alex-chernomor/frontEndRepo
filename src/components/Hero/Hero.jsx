import css from "./Hero.module.css";

export const Hero = () => {
  return (
    <section className={css.hero}>
      <div className={css.container}>
        <h1 className={css.heroTitle}>Plan, Cook, and Share Your Flavors</h1>
        <div className={css.heroWrapper}>
          <input className={css.heroInput} placeholder="Search recipes" />
          <button className={css.heroBtn}>Search</button>
        </div>
      </div>
    </section>
  );
};
