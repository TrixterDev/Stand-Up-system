import React from "react";
import styles from "./Modal.module.sass";
import clsx from "clsx";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isVisible: boolean;
  children: React.ReactNode;
  setIsVisible: any;
}

export const Modal: React.FC<ModalProps> = ({
  isVisible,
  setIsVisible,
  children,
}) => {
  return (
    <>
      <div className={clsx(styles.modal, isVisible && styles.active)}>
        <button className={styles.close} onClick={() => setIsVisible(false)}>
          <FaTimes />
        </button>
        <div className={styles["modal-content"]}>{children}</div>
      </div>
      <div
        className={clsx(styles.overlay, isVisible && styles.active)}
        onClick={() => setIsVisible(false)}
      ></div>
    </>
  );
};
