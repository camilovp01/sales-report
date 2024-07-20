import { Metadata } from "next";

import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Home",
  description: "Pagina visualización Home",
};

export default function HomePage() {
  return (
    <main className={styles.main}>
      <div className={styles["main__options"]}>HOME</div>
    </main>
  );
}
