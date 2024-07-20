import { CSSProperties, ReactNode } from "react";

import styles from "./card.module.scss";

export interface CardProps {
  title: string;
  children: ReactNode;
  style?: CSSProperties;
}

export default function Card({ title, children, style }: Readonly<CardProps>) {
  return (
    <div className={styles.card} style={{ ...style }}>
      <div className={styles["card__header"]}>
        <p>{title}</p>
      </div>
      {children}
    </div>
  );
}
