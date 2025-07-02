import React, { useEffect } from "react";
// import { createPortal } from "react-dom";
import css from "./ModalWindow.module.css";
import Button from "../Button/Button";

// const modalRoot = document.querySelector("#modal-root") ?? document.body;

const MODAL_CONFIG = {
  unauthorised: {
    title: "Error while saving",
    message: "To save this recipe, you need to authorize first",
    confirmLabel: "Log in",
    cancelLabel: "Register",
    confirmVariant: "secondary",
    cancelVariant: "primary",
  },
  logout: {
    title: "Are you sure?",
    message: "We will miss you!",
    confirmLabel: "Log out",
    cancelLabel: "Cancel",
    confirmVariant: "danger",
    cancelVariant: "secondary",
  },
  success: {
    title: "Done! Recipe saved",
    message: "You can find recipe in your profile",
    confirmLabel: "Go to My Profile",
    cancelLabel: null,
    confirmVariant: "primary",
  },
};

export default function ModalWindow({ type, onConfirm, onCancel, onClose }) {
  const config = MODAL_CONFIG[type];

  // close with Esc

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden"; //lock scroll

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; //unlock scroll
    };
  }, [onClose]);

  if (!config) return null;

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose} aria-label="Close">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.25 0.75L8 7.5M8 7.5L1.25 14.25M8 7.5L14.75 14.25M8 7.5L14.75 0.750001"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h2 className={css.title}>{config.title}</h2>
        <p className={css.message}>{config.message}</p>
        <div className={css.buttons}>
          <Button
            onClick={onConfirm}
            variant={config.confirmVariant}
            className={css.button}
          >
            {config.confirmLabel}
          </Button>
          {config.cancelLabel && (
            <Button
              onClick={onCancel ?? onClose}
              variant={config.cancelVariant}
            >
              {config.cancelLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
