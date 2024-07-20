import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import styles from "./CheckboxFilter.module.scss";

export interface FilterCheckboxProps {
  options: {
    paymentLink: string;
    terminal: string;
    all: string;
  };
}

export default function CheckboxFilter({
  options,
}: Readonly<FilterCheckboxProps>) {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const values = Object.values(options);
  return (
    <div className={styles["container__wrapper"]}>
      <button
        onClick={() => setShowFilter(true)}
        className={styles["container__wrapper__button"]}
      >
        Filtrar
      </button>
      <SlidersHorizontal
        onClick={() => setShowFilter(true)}
        size={16}
        className={styles["container__wrapper__icon"]}
      />
      {showFilter && (
        <div className={styles["container__wrapper__options"]}>
          <div className={styles["container__wrapper__close"]}>
            <X
              size={16}
              className={styles["container__wrapper__icon"]}
              onClick={() => setShowFilter(false)}
            />
          </div>
          {values.map((value, i) => (
            <div key={value}>
              <input type="checkbox" id={value} />
              <label htmlFor={value}>{value}</label>
            </div>
          ))}
          <button>Aplicar </button>
        </div>
      )}
    </div>
  );
}
