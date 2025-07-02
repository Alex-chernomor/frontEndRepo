import css from "./Button.module.css";

export default function Button({
  children,
  variant = "lightButton",
  type = "button",
  disabled = false,
  className = "",
  onClick,
  ...props
}) {
  return (
    <button
      className={`${css.button} ${css[variant]} ${
        disabled ? css.disabled : ""
      } ${className}`}
      type = {type}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}


// import React from "react";
// import css from "./Button.module.css";

// export default function Button({ children, nameButton, onClick, ...props }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`${css.button} ${nameButton}`}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }
