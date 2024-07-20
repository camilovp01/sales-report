"use client";

import useAppContext from "@/hooks/useAppContext";
import { useState } from "react";
import styles from "./filter.module.scss";

export interface FilterProps {
  options: {
    currentDay: string;
    currentWeek: string;
    currentMonth: string;
  };
}

export default function Filter({ options }: Readonly<FilterProps>) {
  const [clickedIndex, setClickedIndex] = useState<string>();
  const { changeFilter } = useAppContext();
  const values = Object.values(options);
  const keys = Object.keys(options);

  const handleClick = (option: string) => {
    if (clickedIndex === option) {
      setClickedIndex("");
      changeFilter("");
      return;
    }
    setClickedIndex(option);
    changeFilter(option);
  };
  return (
    <div className={styles.filter}>
      {values.map((value, i) => (
        <button
          key={value}
          onClick={() => handleClick(keys[i])}
          className={`${styles.button} ${
            clickedIndex === keys[i] ? styles["button--active"] : ""
          }`}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
