"use client";

import useAppContext from "@/hooks/useAppContext";
import { useEffect, useState } from "react";
import styles from "./filter.module.scss";

export interface FilterProps {
  options: {
    currentDay: string;
    currentWeek: string;
    currentMonth: string;
  };
  defaultValue?: {
    currentDay: boolean;
    currentWeek: boolean;
    currentMonth: boolean;
  };
}

export default function Filter({
  options,
  defaultValue = { currentDay: false, currentWeek: false, currentMonth: false },
}: Readonly<FilterProps>) {
  const [clickedElement, setClickedElement] = useState<string>();
  const { changeFilter } = useAppContext();
  const values = Object.values(options);
  const keys = Object.keys(options);

  const handleClick = (option: string) => {
    setClickedElement(option);
    changeFilter(option);
  };

  useEffect(() => {
    const keyOptions = Object.keys(options);
    const result = keyOptions.find((keyOption) => {
      return defaultValue[keyOption as keyof boolean];
    });
    setClickedElement(result);
  }, [defaultValue]);

  return (
    <div className={styles.filter}>
      {values.map((value, i) => (
        <button
          key={value}
          onClick={() => handleClick(keys[i])}
          className={`${styles.button} ${
            clickedElement === keys[i] ? styles["button--active"] : ""
          }`}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
