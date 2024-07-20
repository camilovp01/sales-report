import Image from "next/image";
import Link from "next/link";

import styles from "../header/header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <Link aria-label="Pagina principal Bold" href={"/"}>
          <Image
            src="/images/bold-icon.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
            priority
          />
        </Link>
      </div>
      <nav className={styles.options}>
        <Link href="#mi-negocio">Mi Negocio</Link>
        <Link href="#ayuda">Ayuda</Link>
      </nav>
    </header>
  );
}
