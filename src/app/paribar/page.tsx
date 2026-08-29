import Link from "next/link";
import styles from "./ss-paribar.module.css";

const ENTRIES = [
  {
    index: "01",
    relation: "Bhai",
    occasion: "Marriage",
    url: "https://youtu.be/CIvogt9Q11c?si=hvCtu8uzuJl9gpy4",
  },
  {
    index: "02",
    relation: "Bapa",
    occasion: "Retirement",
    url: "https://youtu.be/zyBh8x1t6Ss?si=0qdUlSDwm8rwqKnG",
  },
  {
    index: "03",
    relation: "Apa",
    occasion: "Marriage",
    url: "https://youtu.be/t2z7XQ_QqPE?si=ayMYUkdU4gdlRcIZ",
  },
] as const;

export default function SSParibar() {
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
          <span className={styles.crumb}>Paribar</span>
        </div>

        <div className={styles.body}>
          <div className={styles.introBlock}>
            <h1 className={styles.title}>Paribar</h1>
            <p className={styles.intro}>
              A few family moments, kept for those who were there — and those
              who couldn&apos;t be.
            </p>
          </div>

          <div className={styles.scrollArea}>
            <div className={styles.grid}>
              {ENTRIES.map((entry) => (
                <a
                  key={entry.url}
                  className={styles.entry}
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className={styles.entryEyebrow}>{entry.index} — Family</p>
                  <h2 className={styles.entryName}>{entry.relation}</h2>
                  <p className={styles.entryDesc}>{entry.occasion}</p>
                  <span className={styles.entryLink}>
                    Watch on YouTube
                    <span className={styles.arrow} aria-hidden="true">
                      &#8599;
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <p className={styles.note}>
              These videos are restricted — sign in with the Google account
              they were shared with to view.
            </p>

            <div className={styles.back}>
              <Link className={styles.backLink} href="/">
                &larr; Back home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
