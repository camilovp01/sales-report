import type { Metadata } from "next";

import styles from "./layout.module.scss";

export const metadata: Metadata = {
  title: "Ventas",
  description: "Pagina visualización de Ventas Bold",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={styles.main}>{children}</main>;
}
