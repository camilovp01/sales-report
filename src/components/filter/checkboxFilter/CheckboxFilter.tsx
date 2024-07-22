import { Filters } from "@/app/sales/interfaces/Filters";
import useAppContext from "@/hooks/useAppContext";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
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
  const initialCheckedState = keys.map(
    (key) => defaultChecked[key as keyof typeof defaultChecked] || false,
  );

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const { changeCheckbox } = useAppContext();
  const [checkedState, setCheckedState] = useState(initialCheckedState);
  const [filterIsValid, setFilterIsValid] = useState<boolean>(false);

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item,
    );
    if (!updatedCheckedState.includes(true)) {
      const result = createPartialFiltersObject(
        keys,
        updatedCheckedState,
      ) as Filters;

      changeCheckbox({ ...result });
    }
    setCheckedState(updatedCheckedState);
  };

  const submit = () => {
    const result = createPartialFiltersObject(keys, checkedState) as Filters;
    changeCheckbox({ ...result });
  };

  const createPartialFiltersObject = (
    keys: string[],
    checkedState: boolean[],
  ): Partial<Filters> => {
    return Object.fromEntries(
      keys.map((key, index) => [key, checkedState[index]]),
    ) as Partial<Filters>;
  };

  useEffect(() => {
    setFilterIsValid(Object.values(checkedState).includes(true));
  }, [checkedState]);

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
