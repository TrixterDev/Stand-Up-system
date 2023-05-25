import React, { ReactNode, useState } from "react";
import styles from "./style.module.sass";
import cn from "clsx";

interface Props {
  children: ReactNode;
  title: ReactNode;
  src?: string;
  top: string;
}

const Select: React.FC<Props> = ({ children, title, src, top }) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className={styles.dropDown}>
      <div
        className={styles.dropDown__title}
        onClick={() => setShow((show) => !show)}
      >
        <img className={styles.img} src={src} alt="" />
        <p>{title}</p>
      </div>
      <div
        className={cn(styles.dropDown__list, show && styles.active)}
        style={{ top: top }}
      >
        {children}
      </div>
    </div>
  );
};

export default Select;
