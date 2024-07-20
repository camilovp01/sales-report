import { Search } from "lucide-react";
import styles from "./input.module.scss";

export interface InputFilterProps {
  onChange: (text: string) => void;
}

export default function InputFilter({ onChange }: Readonly<InputFilterProps>) {
  return (
    <div className={styles["search-container__input-wrapper"]}>
      <Search className={styles["search-container__icon"]} />
      <input
        className={styles["search-container__input"]}
        type="text"
        placeholder="Buscar"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
