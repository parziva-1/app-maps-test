import React from "react";
import styles from "./button.module.css";

interface Props {
  type: string;
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ type, onClick, children }: Props) => {
  return (
    <button
      className={`${styles.button} ${
        type === "signIn" ? styles.signIn : styles.signOut
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
