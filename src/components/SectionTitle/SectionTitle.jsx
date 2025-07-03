import css from './SectionTitle.module.css';


const SectionTitle = ({ children }) => {
  return <h2 className={css.title}>{children}</h2>;
};

export default SectionTitle;

// export default function SectionTitle({ children, className = '' }) {
//   return (
//     <h2 className={`${styles.title} ${className}`}>
//       {children}
//     </h2>
//   );
// }
