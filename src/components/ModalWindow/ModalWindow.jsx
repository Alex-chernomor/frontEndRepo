import React, { useEffect } from "react";
// import { createPortal } from "react-dom";
import css from "./ModalWindow.module.css";
import Button from "../Button/Button";
import { CloseIcon } from "../Icons/Icons.jsx";

// const modalRoot = document.querySelector("#modal-root") ?? document.body;

const MODAL_CONFIG = {
  unauthorised: {
    title: "Error while saving",
    message: "To save this recipe, you need to\nauthorize first!",
    confirmLabel: "Log in",
    cancelLabel: "Register",
    confirmVariant: "secondary",
    cancelVariant: "primary",
    confirmClass: "unauthConfirmBtn",
    cancelClass: "unauthCancelBtn",
  },
  logout: {
    title: "Are you sure?",
    message: "We will miss you!",
    confirmLabel: "Log out",
    cancelLabel: "Cancel",
    confirmVariant: "danger",
    cancelVariant: "secondary",
    confirmClass: "logoutBtn",
    cancelClass: "cancelBtn",
  },
  success: {
    title: "Done! Recipe saved",
    message: "You can find recipe in your profile",
    confirmLabel: "Go to My Profile",
    cancelLabel: null,
    confirmVariant: "primary",
    confirmClass: "successBtn",
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
      <div
        className={`${css.modal} ${css[type]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={css.closeBtn} onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>
        <h2 className={css.title}>{config.title}</h2>
        <p className={css.message}>{config.message}</p>
        <div className={css.buttons}>
          <Button
            onClick={onConfirm}
            variant={config.confirmVariant}
            className={css[config.confirmClass] ?? ""}
          >
            {config.confirmLabel}
          </Button>
          {config.cancelLabel && (
            <Button
              onClick={onCancel ?? onClose}
              variant={config.cancelVariant}
              className={css[config.cancelClass] ?? ""}
            >
              {config.cancelLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
