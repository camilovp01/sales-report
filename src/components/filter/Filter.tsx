"use client";

import styles from "./filter.module.scss";
import FilterOptions from "./filterOptions/FilterOptions";

export interface FilterProps {
  options: string[];
  handleOptions: (() => void)[];
}
export default function Filter() {
  const handleCurrentDay = () => {};

  const handleCurrentWeek = () => {};

  const handleCurrentMonth = () => {};
  return (
    <div className={styles.filter}>
      <FilterOptions
        options={["Hoy", "Esta semana", "Junio"]}
        handleOptions={[
          handleCurrentDay,
          handleCurrentWeek,
          handleCurrentMonth,
        ]}
      ></FilterOptions>
    </div>
  );
}
