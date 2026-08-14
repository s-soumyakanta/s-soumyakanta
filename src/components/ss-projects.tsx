import Link from "next/link";
import Image from "next/image";
import styles from "./ss-projects.module.css";

const PROJECT_URL = "https://touchtyping.online";

export default function SSProjects() {
  return (
    <div className={styles.root}>
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.stage}>
        <span className={`${styles.tick} ${styles.tl}`} aria-hidden="true" />
        <span className={`${styles.tick} ${styles.tr}`} aria-hidden="true" />
        <span className={`${styles.tick} ${styles.bl}`} aria-hidden="true" />
        <span className={`${styles.tick} ${styles.br}`} aria-hidden="true" />

        <div className={styles.head}>
          <Link className={styles.brand} href="/">
            S Soumyakanta
          </Link>
          <span className={styles.crumb}>Projects</span>
        </div>

        <div className={styles.body}>
          <div>
            <h1 className={styles.title}>Projects</h1>
            <p className={styles.intro}>
              Things I&apos;ve built and maintain.
            </p>
          </div>

          <article className={styles.project}>
            <div className={styles.projectInfo}>
              <p className={styles.projectEyebrow}>01 — Web platform</p>
              <h2 className={styles.projectName}>Touch Typing Online</h2>

              <p className={styles.desc}>
                Learn to type, practice with real tests, and earn a free typing 
                certificate.
              </p>

              <Link
                className={styles.cta}
                href={PROJECT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit touchtyping.online
                <span className={styles.arrow} aria-hidden="true">
                  &#8599;
                </span>
              </Link>
            </div>

            <div className={styles.certWrap}>
              <p className={styles.certLabel}>touchtyping.online/certification</p>
              <div className={styles.certFrame}>
                <Image
                  className={styles.certImage}
                  src="/touch-typing-certificate-s-soumyakanta.png"
                  alt="Typing speed certificate from Touch Typing Online, showing words-per-minute and accuracy score, awarded free on completing a typing test"
                  loading="lazy"
                  width={392}
                  height={272}
                />
              </div>
              <div className={styles.certActions}>
                <Link
                  className={`${styles.certBtn} ${styles.certBtnSecondary}`}
                  href="https://www.touchtyping.online/certificate/32df9b82-6d28-4658-a6c4-ae6549ff36d8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Certificate
                </Link>
                <Link
                  className={`${styles.certBtn} ${styles.certBtnPrimary}`}
                  href="https://www.touchtyping.online/certification"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get a Free Certificate
                </Link>
              </div>
            </div>
          </article>

          <div className={styles.back}>
            <Link className={styles.backLink} href="/">
              &larr; Back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
