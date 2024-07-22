import { CSSProperties, ReactNode } from "react";

import styles from "./card.module.scss";

export interface CardProps {
  title: string;
  children: ReactNode;
  style?: CSSProperties;
  icon?: any;
}

export default function Card({
  title,
  children,
  style,
  icon,
}: Readonly<CardProps>) {
  return (
    <div className={styles.card} style={{ ...style }}>
      <div className={styles["card__header"]}>
        <p>{title}</p>
        {icon}
      </div>
      {children}
    </div>
  );
}
