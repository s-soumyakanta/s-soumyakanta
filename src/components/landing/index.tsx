import Link from "next/link";
import styles from "./index.module.css";

const NAME = "S Soumyakanta";
const EMAIL = "contact@s-soumyakanta.com";

export default function Landing() {
  return (
    <div className={styles.root}>
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.stage}>
        <span className={`${styles.tick} ${styles.tl}`} aria-hidden="true" />
        <span className={`${styles.tick} ${styles.tr}`} aria-hidden="true" />
        <span className={`${styles.tick} ${styles.bl}`} aria-hidden="true" />
        <span className={`${styles.tick} ${styles.br}`} aria-hidden="true" />

        <div className={styles.main}>
          <h1 className={styles.name}>{NAME}</h1>

          <div className={styles.meta}>
            <a className={styles.email} href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>

            <nav className={styles.links} aria-label="Pages">
              <Link className={styles.link} href="/projects">
                Projects 
              </Link>
              <Link className={styles.link} href="/contact">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
