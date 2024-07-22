import { Metadata } from "next";

import Link from "next/link";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Bold",
  description: "Pagina visualización Ingreso Bold",
};

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles["main__options"]}>
        <button className={styles["welcome"]}>
          <Link href="/sales">Ingresar</Link>
        </button>
      </div>
    </main>
  );
}
