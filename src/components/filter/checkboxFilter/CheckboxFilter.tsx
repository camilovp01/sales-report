import useAppContext from "@/hooks/useAppContext";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import styles from "./CheckboxFilter.module.scss";

export interface FilterCheckboxProps {
  options: {
    terminalSales: string;
    linkSales: string;
    allSales: string;
  };
  defaultChecked?: {
    terminalSales?: boolean;
    linkSales?: boolean;
    allSales?: boolean;
  };
}

export default function CheckboxFilter({
  options,
  defaultChecked = { terminalSales: false, linkSales: false, allSales: false },
}: Readonly<FilterCheckboxProps>) {
  const values = Object.values(options);
  const keys = Object.keys(options);

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const { changeCheckbox } = useAppContext();

  const initialCheckedState = keys.map(
    (key) => defaultChecked[key as keyof typeof defaultChecked] || false,
  );
  const [checkedState, setCheckedState] = useState(initialCheckedState);

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item,
    );
    setCheckedState(updatedCheckedState);
  };

  const submit = () => {
    const result = Object.fromEntries(
      keys.map((key, index) => [key, checkedState[index]]),
    );
    changeCheckbox(result);
  };

  const filterIsValid = Object.values(checkedState).includes(true);

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
      <div
        className={`${showFilter ? styles["container__wrapper__options--show"] : styles["container__wrapper__options--hide"]}`}
      >
        <div className={styles["container__wrapper__close"]}>
          <div className={styles["container__wrapper__title"]}>
            <p>Filtrar</p>
          </div>
          <X
            size={16}
            className={styles["container__wrapper__icon"]}
            onClick={() => setShowFilter(false)}
          />
        </div>
        {values.map((value, i) => (
          <div key={value} className={styles["container__wrapper__option"]}>
            <input
              type="checkbox"
              id={value}
              checked={checkedState[i]}
              onChange={() => handleOnChange(i)}
            />
            <label htmlFor={value}>{value}</label>
          </div>
        ))}
        <button
          disabled={!filterIsValid}
          className={`${styles["container__button"]}`}
          onClick={submit}
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}
