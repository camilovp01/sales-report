import { useState } from "react";

import styles from "./filterOptions.module.scss";

export interface FilterProps {
  options: string[];
  handleOptions: (() => void)[];
}
export default function FilterOptions({
  options,
  handleOptions,
}: Readonly<FilterProps>) {
  const [clickedIndex, setClickedIndex] = useState<number>(2);

  const handleClick = (index: number) => {
    setClickedIndex(index);
    handleOptions[index]();
  };
  if (options.length !== handleOptions.length) {
    return <span>Debes asignar una función para cada opción del filtro</span>;
  }
  return (
    <>
      {options.map((option, i) => (
        <button
          key={option}
          onClick={() => handleClick(i)}
          className={`${styles.button} ${
            clickedIndex === i ? styles["button--active"] : ""
          }`}
        >
          {option}
        </button>
      ))}
    </>
  );
}
